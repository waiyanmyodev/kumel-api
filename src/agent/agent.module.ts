import { Module } from "@nestjs/common";
import { AgentService } from "./agent.service";
import { AgentController } from "./agent.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AgentJwtStrategy } from "src/common/src/strategies/agent-jwt.strategy";
import { AdminJwtStrategy } from "src/common/src/strategies/admin-jwt.strategy";
import { MasterJwtStrategy } from "src/common/src/strategies/master-jwt.strategy";
import { AgentAuthService } from "./auth.service";

@Module({
  imports: [JwtModule.register({})],
  controllers: [AgentController],
  providers: [
    AgentAuthService,
    AgentService,
    PrismaService,
    ConfigService,
    JwtService,
    AgentJwtStrategy,
    MasterJwtStrategy,
    AdminJwtStrategy,
  ],
  exports: [AgentModule, AgentJwtStrategy, AdminJwtStrategy, MasterJwtStrategy],
})
export class AgentModule {}
