import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary';

interface MulterRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}

const upload = multer({ storage: multer.memoryStorage() });

export const handleFileUploads = upload.fields([
  { name: 'ninDocument', maxCount: 1 },
  { name: 'votersCardDocument', maxCount: 1 },
  { name: 'bvnDocument', maxCount: 1 }
]);

export const uploadToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Cast to custom MulterRequest type
    const multerReq = req as MulterRequest;
    const files = multerReq.files;

    if (!files) {
      return next(); // No files to process, move to next middleware
    }

    const uploadPromises = Object.entries(files).map(
      ([fieldName, fileArray]) => {
        const file = fileArray[0];
        return new Promise<void>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error: any, result: any) => {
              if (error) return reject(error);
              req.body[fieldName] = result?.secure_url;
              resolve();
            }
          );
          stream.end(file.buffer);
        });
      }
    );

    await Promise.all(uploadPromises);
    next();
  } catch (error: any) {
    next(error); 
  }
};