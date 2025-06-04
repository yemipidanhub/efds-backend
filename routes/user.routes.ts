import { Router } from 'express';
import { getUserDashboard } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/dashboard', authenticate, (req, res, next) => {
  Promise.resolve(getUserDashboard(req, res)).catch(next);
});

export default router;