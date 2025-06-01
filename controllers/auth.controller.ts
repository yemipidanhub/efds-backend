import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserModel } from '../models/User.model';
import { sendVerificationEmail } from '../utils/email';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { password, confirmPassword, ...userData } = req.body;
    console.log('User data:', userData);
    console.log('Files:', {
      ninDocument: userData.ninDocument ? 'exists' : 'missing',
      votersCardDocument: userData.votersCardDocument ? 'exists' : 'missing',
      bvnDocument: userData.bvnDocument ? 'exists' : 'missing'
    });

    const existingUser = await UserModel.findByEmail(userData.email);
    if (existingUser) {
      res.status(400).json({ error: 'Email already registered' });
      return; 
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;

    // Convert string booleans to actual booleans
    if (typeof userData.agreedToTerms === 'string') {
      userData.agreedToTerms = userData.agreedToTerms === 'true';
    }
    if (typeof userData.receiveUpdates === 'string') {
      userData.receiveUpdates = userData.receiveUpdates === 'true';
    }

    try {
      const userId = await UserModel.create(userData);

      const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      await sendVerificationEmail(userData.email, token);

      res.status(201).json({ 
        message: 'Registration successful. Please check your email for verification instructions.' 
      });
    } catch (error: any) {
      console.error('User creation error:', error); // Log the actual error
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.sqlMessage.includes('nin')) {
          res.status(400).json({ error: 'NIN already exists' });
        } else if (error.sqlMessage.includes('email')) {
          res.status(400).json({ error: 'Email already exists' });
        } else if (error.sqlMessage.includes('votersCard')) {
          res.status(400).json({ error: 'Voters card already exists' });
        } else if (error.sqlMessage.includes('bvn')) {
          res.status(400).json({ error: 'BVN already exists' });
        } else {
          res.status(400).json({ error: 'Duplicate entry' });
        }
        return;
      }
      res.status(400).json({ error: 'Registration failed' });
      return;
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    
    await UserModel.verifyEmail(decoded.userId);
    
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};