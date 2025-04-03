import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadToLocal } from "../../utils/fileUpload";

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
}
