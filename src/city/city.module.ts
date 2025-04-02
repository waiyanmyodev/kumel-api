import { Module } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { CityController } from "./city.controller";
import { CityService } from "./city.service";

@Module({
  controllers: [CityController],
  providers: [CityService, PrismaService, ConfigService],
})
export class CityModule {}
