import { Module } from "@nestjs/common";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AdminJwtStrategy } from "src/common/src/strategies/admin-jwt.strategy";
import { IsPermissionNameExists } from "./dto/is-permission-name-exits";

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [PermissionController],
  providers: [
    PermissionService,
    PrismaService,
    ConfigService,
    JwtService,
    AdminJwtStrategy,
    IsPermissionNameExists,
  ],
  exports: [AdminJwtStrategy, PermissionService, IsPermissionNameExists],
})
export class PermissionModule {}
