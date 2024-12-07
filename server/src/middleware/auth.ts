import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string; // Assuming you want to include user ID
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token is no longer valid, forbidden
    }

    // Ensure the user object is correctly typed
    if (typeof user !== 'string' && user !== undefined) {
      req.user = user as JwtPayload; // Attach user data to the request object
    }

    next(); // Proceed to the next middleware or route handler
    return; // Ensure the callback always returns a value
  });

  return; // Ensure the function always returns a value
};
