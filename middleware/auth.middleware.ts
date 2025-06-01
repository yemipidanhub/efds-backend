import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware to log response body
export const logResponseBody = (req: Request, res: Response, next: NextFunction) => {
  const oldSend = res.send;
  res.send = function (body) {
    console.log('Response Body:', body);
    // @ts-ignore
    return oldSend.call(this, body);
  };
  next();
};

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
    return;
  }
};