import { Body, Controller, Get, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminLoginDto } from "./dto/admin-login.dto";
import { AdminAuthService } from "./auth.service";
import { Public } from "src/common/src/decorator/pubic.decorator";

@Controller("admin")
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly adminAuthService: AdminAuthService
  ) {}

  @Public()
  @Post("auth/login")
  login(@Body() adminLoginDto: AdminLoginDto) {
    return this.adminAuthService.login(adminLoginDto);
  }
}
