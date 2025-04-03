import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from "@nestjs/swagger";
import { RequestHelpService } from "./request-help.service";
import { CreateRequestHelpDto } from "./dto/create-request-help.dto";
import { UpdateRequestHelpDto } from "./dto/update-request-help.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadToLocal } from "utils/fileUpload";

@ApiTags("Request Help")
@Controller("request-help")
export class RequestHelpController {
  constructor(private readonly requestHelpService: RequestHelpService) {}

  @Post()
  @ApiOperation({ summary: "Create a new request help entry" })
  @ApiConsumes("multipart/form-data")
  @ApiResponse({ status: 201, description: "Successfully created." })
  @UseInterceptors(FileInterceptor("file", uploadToLocal()))
  create(
    @Body() createRequestHelpDto: CreateRequestHelpDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const requestHelpData = {
      ...createRequestHelpDto,
      image: file.path,
    };
    return this.requestHelpService.create(requestHelpData);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all request help entries" })
  @ApiResponse({ status: 200, description: "Successfully retrieved." })
  findAll() {
    return this.requestHelpService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a single request help entry" })
  @ApiResponse({ status: 200, description: "Successfully retrieved." })
  findOne(@Param("id") id: string) {
    return this.requestHelpService.findOne(Number(id));
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a request help entry" })
  @ApiConsumes("multipart/form-data")
  @ApiResponse({ status: 200, description: "Successfully updated." })
  @UseInterceptors(FileInterceptor("file", uploadToLocal()))
  update(
    @Param("id") id: string,
    @Body() updateRequestHelpDto: UpdateRequestHelpDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const updateData = {
      ...updateRequestHelpDto,
      image: file.path,
    };
    return this.requestHelpService.update(Number(id), updateData);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a request help entry" })
  @ApiResponse({ status: 200, description: "Successfully deleted." })
  remove(@Param("id") id: string) {
    return this.requestHelpService.remove(Number(id));
  }
}
