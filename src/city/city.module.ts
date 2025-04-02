import { Module } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { MasterJwtAuthGuard } from "src/common/src/guards/master-jwt-auth.guard";
import { AgentJwtAuthGuard } from "src/common/src/guards/agent-jwt-auth.guard";
import { CityController } from "./city.controller";
import { CityService } from "./city.service";

@Module({
  controllers: [CityController],
  providers: [
    CityService,
    PrismaService,
    ConfigService,
    MasterJwtAuthGuard,
    AgentJwtAuthGuard,
  ],
})
export class CityModule {}
