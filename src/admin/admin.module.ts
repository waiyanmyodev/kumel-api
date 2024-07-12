import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { AdminAuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminAuthService,
    PrismaService,
    ConfigService,
    JwtService,
    JwtStrategy,
  ],
  exports: [JwtStrategy, AdminModule],
})
export class AdminModule {}
