import { Controller, Get, Post, Body, Res, UseGuards } from "@nestjs/common";
import { MasterAuthService } from "./auth.service";
import { Public } from "src/common/src/decorator/pubic.decorator";
import { MasterLoginDto } from "./dto/master-login.dto";
import { Response } from "express";
import { User } from "src/common/src/decorator/current-user.decorator";
import { MasterType } from "./type/master.type";
import { MasterDto } from "./dto/master.dto";
import { plainToClass } from "class-transformer";
import { MasterJwtAuthGuard } from "src/common/src/guards/master-jwt-auth.guard";

@Controller("master")
export class MasterController {
  constructor(private readonly masterAuthService: MasterAuthService) {}

  @Public()
  @Post("auth/login")
  login(
    @Body() adminLoginDto: MasterLoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.masterAuthService.login(adminLoginDto, response);
  }

  @UseGuards(MasterJwtAuthGuard)
  @Get("profile")
  profile(@User() user: MasterType) {
    return plainToClass(MasterDto, user);
  }
}
