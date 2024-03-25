import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import 'dotenv/config';

const s3 = new S3Client({
  credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID, // store it in .env file to keep it safe
      secretAccessKey: process.env.AWS_SECRET_KEY
  },
  region: process.env.REGION // this is the region that you select in AWS account
})

const s3Storage = multerS3({
  s3: s3, // s3 instance
  bucket: process.env.BUCKET_NAME, // change it as per your project requirement
  metadata: (req, file, cb) => {
      cb(null, {fieldname: file.fieldname})
  },
  key: (req, file, cb) => {
      const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
      cb(null, fileName);
  },
  contentType: multerS3.AUTO_CONTENT_TYPE
});

// our middleware
const uploadFile = multer({
  storage: s3Storage,
  limits: {
      fileSize: 1024 * 1024 * 6 // 6Mb maximum file size
  }
})

export default uploadFile;