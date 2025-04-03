import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, ConfigService],
})
export class PostModule {}
