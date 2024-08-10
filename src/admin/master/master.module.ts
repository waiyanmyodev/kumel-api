import { Module } from "@nestjs/common";
import { MasterService } from "./master.service";
import { MasterController } from "./master.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [MasterController],
  providers: [MasterService, PrismaService, ConfigService],
})
export class MasterModule {}
