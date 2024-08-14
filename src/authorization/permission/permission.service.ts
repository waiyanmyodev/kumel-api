import { Injectable } from "@nestjs/common";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { GeneralResponseMessageType } from "src/common/src/exception/general-type";
import { Permission } from "@prisma/client";
import { GENERAL_RESPONSE } from "src/common/src/exception/general-response";
import { SUCCESS_RESPONSE } from "src/common/src/exception/success-response";
import {
  FailCreatePermissionException,
  FailDeletePermissionException,
  FailToFindPermissionExpection,
  FailUpdatePermissionException,
} from "src/common/src/exception/general-exception";
import { ApiCookieAuth } from "@nestjs/swagger";
@ApiCookieAuth("Authentication")
@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPermissionDto: CreatePermissionDto
  ): Promise<GeneralResponseMessageType> {
    try {
      await this.prisma.permission.create({ data: createPermissionDto });
      return SUCCESS_RESPONSE.SUCCESS_CREATE_PERMISSION;
    } catch (error) {
      throw new FailCreatePermissionException();
    }
  }

  async findAll(): Promise<Permission[] | GeneralResponseMessageType> {
    try {
      const permissions = <Permission[]>(
        await this.prisma.permission.findMany({ take: 20 })
      );
      if (!permissions) {
        return GENERAL_RESPONSE.PERMISSION_NOT_FOUND;
      }
      return permissions;
    } catch (error) {
      throw new FailToFindPermissionExpection();
    }
  }

  async findOne(id: number): Promise<Permission | GeneralResponseMessageType> {
    try {
      const permission = <Permission>await this.prisma.permission.findUnique({
        where: { id: Number(id) },
      });
      if (!permission) {
        return GENERAL_RESPONSE.PERMISSION_NOT_FOUND;
      }
      return permission;
    } catch (error) {
      throw new FailToFindPermissionExpection();
    }
  }

  async findByName(
    name: string
  ): Promise<Permission | GeneralResponseMessageType> {
    try {
      const permissions = <Permission>await this.prisma.permission.findFirst({
        where: { name },
      });
      if (!permissions) {
        return GENERAL_RESPONSE.PERMISSION_NOT_FOUND;
      }
      return permissions;
    } catch (error) {
      throw new FailToFindPermissionExpection();
    }
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto
  ): Promise<GeneralResponseMessageType> {
    try {
      const { name } = updatePermissionDto;
      const permission = <Permission>await this.prisma.permission.update({
        where: { id: Number(id) },
        data: { name },
      });
      if (!permission) {
        return GENERAL_RESPONSE.PERMISSION_NOT_FOUND;
      }
      return SUCCESS_RESPONSE.SUCCESS_UPDATE_PERMISSION;
    } catch (error) {
      throw new FailUpdatePermissionException();
    }
  }

  async delete(id: number): Promise<GeneralResponseMessageType> {
    try {
      const permission = <Permission>await this.prisma.permission.delete({
        where: { id: Number(id) },
      });
      if (!permission) {
        return GENERAL_RESPONSE.PERMISSION_NOT_FOUND;
      }
      return SUCCESS_RESPONSE.SUCCESS_DELETE_PERMISSION;
    } catch (error) {
      throw new FailDeletePermissionException();
    }
  }
}
