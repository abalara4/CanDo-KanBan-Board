import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }); // User not found
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Invalid password
    }

    // Create a JWT token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    // Return the token
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' }); // Handle server errors
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
