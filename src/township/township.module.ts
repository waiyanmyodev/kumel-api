import { Module } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

import { TownshipController } from "./township.controller";
import { TownshipService } from "./township.service";

@Module({
  controllers: [TownshipController],
  providers: [TownshipService, PrismaService, ConfigService],
})
export class TownshipModule {}
