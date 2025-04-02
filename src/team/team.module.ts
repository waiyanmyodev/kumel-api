import { Module } from "@nestjs/common";
import { TeamService } from "./team.service";
import { TeamController } from "./team.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [TeamController],
  providers: [TeamService, PrismaService, ConfigService],
})
export class TeamModule {}
