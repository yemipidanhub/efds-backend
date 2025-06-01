import { Router } from 'express';
import { register, verifyEmail } from '../controllers/auth.controller';
import { handleFileUploads, uploadToCloudinary } from '../middleware/upload.middleware';
import { registerValidation, validate } from '../utils/validation';

const router = Router();

router.post(
  '/register',
  handleFileUploads,
  uploadToCloudinary,
  registerValidation,
  validate,
  register
);
router.get('/verify-email/:token', verifyEmail);

export default router;