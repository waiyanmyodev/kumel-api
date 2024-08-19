import { Module } from "@nestjs/common";
import { TeamService } from "./team.service";
import { TeamController } from "./team.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { MasterJwtAuthGuard } from "src/common/src/guards/master-jwt-auth.guard";
import { AgentJwtAuthGuard } from "src/common/src/guards/agent-jwt-auth.guard";

@Module({
  controllers: [TeamController],
  providers: [
    TeamService,
    PrismaService,
    ConfigService,
    MasterJwtAuthGuard,
    AgentJwtAuthGuard,
  ],
})
export class TeamModule {}
