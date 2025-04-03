import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Get,
  Query,
  BadRequestException
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadToLocal, checkImageExists, checkLocalImageExists } from "../../utils/fileUpload";

@Controller("upload")
export class FileController {
  @Post(":type")
  @UseInterceptors(FileInterceptor("file", uploadToLocal()))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param("type") type: string
  ) {
    return {
      message: "File uploaded successfully",
      filePath: `uploads/${type}/${file.filename}`,
    };
  }

  /**
   * Check if a local file exists
   */
  @Get("check-local")
  async checkLocalImage(@Query("path") filePath: string) {
    if (!filePath) {
      throw new BadRequestException("File path is required!");
    }

    const exists = checkLocalImageExists(filePath);
    return {
      filePath: filePath.trim(),
      exists,
      message: exists ? "✅ File exists!" : "File not found!",
    };
  }

  /**
   * Check if a remote image exists
   */
  @Get("check-remote")
  async checkRemoteImage(@Query("url") url: string) {
    const exists = await checkImageExists(url);
    return {
      imageUrl: url,
      exists,
      message: exists ? "✅ Image exists!" : "❌ Image not found!",
    };
  }
}
