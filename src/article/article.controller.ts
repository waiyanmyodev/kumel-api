import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto";
import { UpdateArticleDto } from "./dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Articles")
@Controller("articles")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

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
