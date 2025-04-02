import { Module } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { MasterJwtAuthGuard } from "src/common/src/guards/master-jwt-auth.guard";
import { AgentJwtAuthGuard } from "src/common/src/guards/agent-jwt-auth.guard";

import { TownshipController } from "./township.controller";
import { TownshipService } from "./township.service";

@Module({
  controllers: [TownshipController],
  providers: [
    TownshipService,
    PrismaService,
    ConfigService,
    MasterJwtAuthGuard,
    AgentJwtAuthGuard,
  ],
})
export class TownshipModule {}
