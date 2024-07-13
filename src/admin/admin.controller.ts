import { Body, Controller, Post, Res } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminLoginDto } from "./dto/admin-login.dto";
import { AdminAuthService } from "./auth.service";
import { Public } from "src/common/src/decorator/pubic.decorator";
import { Response } from "express";

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
}
