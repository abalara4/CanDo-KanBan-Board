import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware to authenticate tokens
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.sendStatus(401); // No token, unauthorized
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token is no longer valid, forbidden
    }

    // Attach user data to the request object
    if (typeof user !== 'string' && user !== undefined) {
      req.user = { username: user.username }; // Adjust based on your JWT payload
    }

    next(); // Proceed to the next middleware or route handler
    return;
  });
};
