import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto";
import { UpdateArticleDto } from "./dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminJwtAuthGuard } from "src/common/src/guards/admin-jwt-auth.guard";
import { Public } from "src/common/src/decorator/pubic.decorator";

@ApiTags("Articles")
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
@Controller("articles")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Public()
  @Get()
  async findAll() {
    return this.articleService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.articleService.findOne(Number(id));
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    return this.articleService.update(Number(id), updateArticleDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.articleService.remove(Number(id));
  }
}
