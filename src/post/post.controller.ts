import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BasePaginationQueryDto } from "src/common/src/dto/base-pagination-query.dto";
import { AdminJwtAuthGuard } from "src/common/src/guards/admin-jwt-auth.guard";

@ApiTags("Posts")
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(@Query() baseQuery: BasePaginationQueryDto) {
    return this.postService.findAll(baseQuery);
  }

  @Get(":id")
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  findOne(@Param("id") id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.postService.remove(+id);
  }
}
