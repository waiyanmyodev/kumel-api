import { Module } from "@nestjs/common";
import { MasterService } from "./master.service";
import { MasterController } from "./master.controller";
import { AdminJwtStrategy } from "src/common/src/strategies/admin-jwt.strategy";
import { MasterJwtStrategy } from "src/common/src/strategies/master-jwt.strategy";
import { MasterAuthService } from "./auth.service";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({})],
  controllers: [MasterController],
  providers: [
    MasterService,
    MasterAuthService,
    PrismaService,
    ConfigService,
    JwtService,
    AdminJwtStrategy,
    MasterJwtStrategy,
  ],
  exports: [AdminJwtStrategy, MasterJwtStrategy, MasterModule],
})
export class MasterModule {}
