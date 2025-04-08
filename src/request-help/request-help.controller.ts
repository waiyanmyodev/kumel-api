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
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { RequestHelpService } from "./request-help.service";
import { CreateRequestHelpDto } from "./dto/create-request-help.dto";
import { UpdateRequestHelpDto } from "./dto/update-request-help.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadToLocal } from "utils/fileUpload";
import { AdminJwtAuthGuard } from "src/common/src/guards/admin-jwt-auth.guard";
import { Public } from "src/common/src/decorator/pubic.decorator";

@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@ApiTags("Request Help")
@Controller("request-help")
export class RequestHelpController {
  constructor(private readonly requestHelpService: RequestHelpService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: "Create a new request help entry" })
  @ApiResponse({ status: 201, description: "Successfully created." })
  create(
    @Body() createRequestHelpDto: CreateRequestHelpDto,
  ) {
    return this.requestHelpService.create(createRequestHelpDto);
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

  @Patch(":id/:type")
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  @ApiOperation({ summary: "Update a request help entry" })
  @ApiConsumes("multipart/form-data")
  @ApiResponse({ status: 200, description: "Successfully updated." })
  @UseInterceptors(FileInterceptor("file", uploadToLocal()))
  update(
    @Param("id") id: string,
    @Body() updateRequestHelpDto: UpdateRequestHelpDto,
    @UploadedFile() file: Express.Multer.File,
    // @Param("type") type: string
  ) {
    const updateData = {
      ...updateRequestHelpDto,
      image: file.path,
    };
    return this.requestHelpService.update(Number(id), updateData);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  @ApiOperation({ summary: "Delete a request help entry" })
  @ApiResponse({ status: 200, description: "Successfully deleted." })
  remove(@Param("id") id: string) {
    return this.requestHelpService.remove(Number(id));
  }
}
