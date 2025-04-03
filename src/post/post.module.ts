import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { PaginationService } from "src/common/src/helper/pagination.service";

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, ConfigService, PaginationService],
})
export class PostModule {}
