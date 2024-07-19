import { Injectable } from "@nestjs/common";
import { CreatePermissionGroupDto } from "./dto/create-permission-group.dto";
import { UpdatePermissionGroupDto } from "./dto/update-permission-group.dto";
import {
  FailCreatePermissionGroupException,
  FailToFindPermissionGroupExpection,
  FailUpdatePermissionGroupException,
  FailDeletePermissionGroupException,
} from "src/common/src/exception/general-exception";
import { GeneralResponseMessageType } from "src/common/src/exception/general-type";
import { SUCCESS_RESPONSE } from "src/common/src/exception/success-response";
import { PermissionGroup } from "@prisma/client";
import { GENERAL_RESPONSE } from "src/common/src/exception/general-response";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PermissionGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPermissionDto: CreatePermissionGroupDto
  ): Promise<GeneralResponseMessageType> {
    try {
      const { name, description, type, permissions } = createPermissionDto;
      await this.prisma.permissionGroup.create({
        data: {
          name: name,
          description: description,
          type: type,
          permissions: {
            create: permissions,
          },
        },
      });
      return SUCCESS_RESPONSE.SUCCESS_CREATE_PERMISSION;
    } catch (error) {
      throw new FailCreatePermissionGroupException();
    }
  }

  async findAll(): Promise<PermissionGroup[] | GeneralResponseMessageType> {
    try {
      const permissions = <PermissionGroup[]>(
        await this.prisma.permissionGroup.findMany({ take: 20 })
      );
      if (!permissions) {
        return GENERAL_RESPONSE.PERMISSION_NOT_FOUND;
      }
      return permissions;
    } catch (error) {
      throw new FailToFindPermissionGroupExpection();
    }
  }

  async findOne(
    id: number
  ): Promise<PermissionGroup | GeneralResponseMessageType> {
    try {
      const permission = <PermissionGroup>(
        await this.prisma.permissionGroup.findUnique({
          where: { id: Number(id) },
        })
      );
      if (!permission) {
        return GENERAL_RESPONSE.PERMISSION_NOT_FOUND;
      }
      return permission;
    } catch (error) {
      throw new FailToFindPermissionGroupExpection();
    }
  }

  async findByName(
    name: string
  ): Promise<PermissionGroup | GeneralResponseMessageType> {
    try {
      const permissions = <PermissionGroup>(
        await this.prisma.permissionGroup.findFirst({
          where: { name },
        })
      );
      if (!permissions) {
        return GENERAL_RESPONSE.PERMISSION_NOT_FOUND;
      }
      return permissions;
    } catch (error) {
      throw new FailToFindPermissionGroupExpection();
    }
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionGroupDto
  ): Promise<GeneralResponseMessageType> {
    try {
      const { name, type, description, permissions } = updatePermissionDto;
      const permission = <PermissionGroup>(
        await this.prisma.permissionGroup.update({
          where: { id: Number(id) },
          data: {
            name: name,
            description: description,
            type: type,
            permissions: {
              create: permissions,
            },
          },
        })
      );
      if (!permission) {
        return GENERAL_RESPONSE.PERMISSION_NOT_FOUND;
      }
      return SUCCESS_RESPONSE.SUCCESS_UPDATE_PERMISSION;
    } catch (error) {
      console.log(error);
      throw new FailUpdatePermissionGroupException();
    }
  }

  async delete(id: number): Promise<GeneralResponseMessageType> {
    try {
      const permission = <PermissionGroup>(
        await this.prisma.permissionGroup.delete({
          where: { id: Number(id) },
        })
      );
      if (!permission) {
        return GENERAL_RESPONSE.PERMISSION_NOT_FOUND;
      }
      return SUCCESS_RESPONSE.SUCCESS_DELETE_PERMISSION;
    } catch (error) {
      throw new FailDeletePermissionGroupException();
    }
  }
}
