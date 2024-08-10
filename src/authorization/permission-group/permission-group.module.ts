import { Module } from "@nestjs/common";
import { PermissionGroupService } from "./permission-group.service";
import { PermissionGroupController } from "./permission-group.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AdminJwtStrategy } from "src/common/src/strategies/admin-jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [PermissionGroupController],
  providers: [
    PermissionGroupService,
    PrismaService,
    ConfigService,
    JwtService,
    AdminJwtStrategy,
  ],
  exports: [AdminJwtStrategy],
})
export class PermissionGroupModule {}
