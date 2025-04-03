import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
import { S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";

export const uploadToLocal = () => ({
  storage: diskStorage({
    destination: (req, file, cb) => {
      const type = req.params.type; // Dynamically get type from request params

      if (!type) {
        return cb(new BadRequestException("Missing type parameter"), null);
      }

      const uploadPath = path.join(__dirname, `../../uploads/${type}`);

      // Ensure the directory exists
      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const fileExt = extname(file.originalname);
      const fileName = `${uuidv4()}${fileExt}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void
  ) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
      return callback(new BadRequestException("Invalid file type!"), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

/**
 * Check if a local image file exists
 * @param filePath - The local file path
 * @returns boolean - True if file exists, false otherwise
 */
export const checkLocalImageExists = (filePath: string): boolean => {
  const normalizedPath = path.resolve(filePath.trim());
  console.log("Checking file:", normalizedPath);
  return fs.existsSync(normalizedPath);
};

/**
 * Check if a remote image URL exists
 * @param imageUrl - The URL of the image
 * @returns Promise<boolean> - True if image exists, false otherwise
 */
export const checkImageExists = async (imageUrl: string): Promise<boolean> => {
  try {
    const response = await axios.head(imageUrl);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const uploadToS3 = async (
  fileBuffer: Buffer,
  fileName: string,
  mimetype: string
) => {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_BUCKET_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
    throw new Error("Missing AWS S3 environment variables");
  }

  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  // Resize the image using sharp
  const resizedImage = await sharp(fileBuffer)
    .resize({ height: 720, width: 1280, fit: "contain" })
    .toBuffer();

  const uploadParams = {
    Bucket: bucketName, // Fixed incorrect `this.bucketName`
    Body: resizedImage,
    Key: fileName,
    ContentType: mimetype,
  };

  // Upload the file to S3
  const uploadResult = await s3Client.send(new PutObjectCommand(uploadParams));

  return uploadResult;
};
