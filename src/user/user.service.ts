import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GeneralResponseMessageType } from "src/common/src/exception/general-type";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import {
  FailCreateUserException,
  FailDeleteUserException,
  FailToFindUserExpection,
  FailUpdateUserException,
} from "src/common/src/exception/general-exception";
import { SUCCESS_RESPONSE } from "src/common/src/exception/success-response";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[] | GeneralResponseMessageType> {
    try {
      return await this.prisma.user.findMany({ take: 20 });
    } catch (error) {
      throw new FailToFindUserExpection();
    }
  }

  async create(
    createUserDto: CreateUserDto
  ): Promise<GeneralResponseMessageType> {
    try {
      const hashedPassword = await hash(createUserDto.password, 10);

      await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });

      return SUCCESS_RESPONSE.SUCCESS_CREATE_USER;
    } catch (error) {
      throw new FailCreateUserException();
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      throw new FailToFindUserExpection();
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<GeneralResponseMessageType> {
    try {
      await this.prisma.user.update({
        where: { id: Number(id) },
        data: updateUserDto,
      });
      return SUCCESS_RESPONSE.SUCCESS_UPDATE_USER;
    } catch (error) {
      throw new FailUpdateUserException();
    }
  }

  async remove(id: number): Promise<GeneralResponseMessageType> {
    try {
      await this.prisma.user.delete({ where: { id: Number(id) } });
      return SUCCESS_RESPONSE.SUCCESS_DELETE_USER;
    } catch (error) {
      throw new FailDeleteUserException();
    }
  }
}
