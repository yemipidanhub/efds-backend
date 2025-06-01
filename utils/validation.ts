import { body, validationResult } from 'express-validator';

export const registerValidation = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('gender').isIn(['Male', 'Female']).withMessage('Invalid gender'),
  body('state').notEmpty().withMessage('State is required'),
  body('lga').notEmpty().withMessage('LGA is required'),
  body('ward').notEmpty().withMessage('Ward is required'),
  body('pollingUnit').notEmpty().withMessage('Polling unit is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('phone').isMobilePhone('en-NG').withMessage('Invalid Nigerian phone number'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('nin').isLength({ min: 11, max: 11 }).withMessage('NIN must be 11 digits'),
  body('votersCard').isLength({ min: 19, max: 19 }).withMessage('Voters card must be 19 characters'),
  body('bvn').isLength({ min: 11, max: 11 }).withMessage('BVN must be 11 digits'),
   body('ninDocument').optional().isString(),
  body('votersCardDocument').optional().isString(),
  body('bvnDocument').optional().isString(),
   body('agreedToTerms').optional().isBoolean().withMessage('agreedToTerms must be a boolean'),
  body('receiveUpdates').optional().isBoolean().withMessage('receiveUpdates must be a boolean'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) throw new Error('Passwords do not match');
    return true;
  })
];

export const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};