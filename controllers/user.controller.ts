import { Request, Response } from 'express';
import { UserModel } from '../models/User.model';

export const getUserDashboard = async (req: Request, res: Response) => {
  try {
    // req.user is set by the authenticate middleware
    const userId = (req as any).user.userId;

    // Fetch user from DB (replace with your actual DB logic)
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        name: user.fullName,
        membershipType: user.membershipType || "Member", // Adjust as needed
      }
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};