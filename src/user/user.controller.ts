import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserLoginDto } from "./dto/user-login.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserAuthService } from "./auth.service";
import { Public } from "src/common/src/decorator/pubic.decorator";
import { Response } from "express";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService
  ) {}

  @Public()
  @Post("auth/login")
  login(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.userAuthService.login(userLoginDto, response);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
