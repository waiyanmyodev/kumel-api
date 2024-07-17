import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { AdminAuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AdminJwtStrategy } from "../common/src/strategies/admin-jwt.strategy";
import { MasterModule } from "./master/master.module";
import { APP_GUARD } from "@nestjs/core";
import { AdminJwtAuthGuard } from "src/common/src/guards/admin-jwt-auth.guard";
@Module({
  imports: [PassportModule, JwtModule.register({}), MasterModule],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminAuthService,
    PrismaService,
    ConfigService,
    JwtService,
    AdminJwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AdminJwtAuthGuard,
    },
  ],
  exports: [AdminJwtStrategy, AdminModule],
})
export class AdminModule {}
