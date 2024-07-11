import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { AdminAuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminAuthService,
    PrismaService,
    ConfigService,
    JwtService,
  ],
})
export class AdminModule {}
