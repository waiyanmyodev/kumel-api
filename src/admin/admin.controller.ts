import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminLoginDto } from "./dto/admin-login.dto";
import { AdminAuthService } from "./auth.service";
import { Public } from "src/common/src/decorator/pubic.decorator";
import { Response } from "express";
import { User } from "src/common/src/decorator/current-user.decorator";
import { AdminType } from "./type/admin.type";
import { AdminDto } from "./dto/admin.dto";
import { plainToClass } from "class-transformer";
import { AdminJwtAuthGuard } from "src/common/src/guards/admin-jwt-auth.guard";

@Controller("admin")
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly adminAuthService: AdminAuthService
  ) {}

  @Public()
  @Post("auth/login")
  login(
    @Body() adminLoginDto: AdminLoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.adminAuthService.login(adminLoginDto, response);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get("profile")
  profile(@User() user: AdminType) {
    return plainToClass(AdminDto, user);
  }
}
