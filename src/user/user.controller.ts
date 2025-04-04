import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserLoginDto } from "./dto/user-login.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserAuthService } from "./auth.service";
import { Public } from "src/common/src/decorator/pubic.decorator";
import { Response } from "express";
import { UserJwtAuthGuard } from "src/common/src/guards/user-jwt-auth.guard";
import { User } from "src/common/src/decorator/current-user.decorator";
import { UserType } from "./type/user.type";
import { UserDto } from "./dto/user.dto";
import { plainToClass } from "class-transformer";
import { ApiTags } from "@nestjs/swagger";
import { AdminJwtAuthGuard } from "src/common/src/guards/admin-jwt-auth.guard";

@ApiTags("Users")
@UseGuards(AdminJwtAuthGuard)
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

  @UseGuards(UserJwtAuthGuard)
  @Get("profile")
  profile(@User() user: UserType) {
    return plainToClass(UserDto, user);
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
