import { Module } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, PrismaService, ConfigService],
})
export class ArticleModule {}
