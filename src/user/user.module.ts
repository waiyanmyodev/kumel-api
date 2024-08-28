import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { MasterJwtAuthGuard } from "src/common/src/guards/master-jwt-auth.guard";
import { AgentJwtAuthGuard } from "src/common/src/guards/agent-jwt-auth.guard";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    ConfigService,
    MasterJwtAuthGuard,
    AgentJwtAuthGuard,
  ],
})
export class UserModule {}
