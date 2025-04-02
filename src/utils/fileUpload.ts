import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
export const uploadToLocal = {
  storage: diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join("");
      return cb(null, `${randomName}${extname(file.originalname)}`);
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
