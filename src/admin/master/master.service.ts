import { Injectable } from "@nestjs/common";
import { CreateMasterDto } from "./dto/create-master.dto";
import { UpdateMasterDto } from "./dto/update-master.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { GeneralResponseMessageType } from "src/common/src/exception/general-type";
import { Master } from "@prisma/client";
import {
  FailCreateMasterException,
  FailDeleteMasterException,
  FailedToGetMasterByDateExpection,
  FailToAssginPermissionGroupExpection,
  FailUpdateMasterException,
  MasterNotFoundException,
} from "src/common/src/exception/general-exception";
import { SUCCESS_RESPONSE } from "src/common/src/exception/success-response";
import { AssginPermissionGroupDto } from "src/common/src/dto/assgin-permission-group.dto";
import { hash } from "bcrypt";
@Injectable()
export class MasterService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Master[] | GeneralResponseMessageType> {
    try {
      return await this.prisma.master.findMany({ take: 20 });
    } catch (error) {
      new FailedToGetMasterByDateExpection();
    }
  }

  async create(
    createMasterDto: CreateMasterDto
  ): Promise<GeneralResponseMessageType> {
    try {
      const password = await hash(createMasterDto.password, 10);
      await this.prisma.master.create({
        data: { ...createMasterDto, password: password },
      });
      return SUCCESS_RESPONSE.SUCCESS_CREATE_MASTER;
    } catch (error) {
      throw new FailCreateMasterException();
    }
  }

  async findOne(id: number): Promise<Master> {
    try {
      return await this.prisma.master.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      throw new MasterNotFoundException();
    }
  }

  async update(
    id: number,
    updateMasterDto: UpdateMasterDto
  ): Promise<GeneralResponseMessageType> {
    try {
      const updatedMaster = { ...updateMasterDto };
      if (updatedMaster.password) {
        updatedMaster.password = await hash(updateMasterDto.password, 10);
      }
      await this.prisma.master.update({
        where: { id: Number(id) },
        data: updatedMaster,
      });
      return SUCCESS_RESPONSE.SUCCESS_UPDATE_MASTER;
    } catch (error) {
      throw new FailUpdateMasterException();
    }
  }

  async remove(id: number): Promise<GeneralResponseMessageType> {
    try {
      await this.prisma.master.delete({ where: { id: Number(id) } });
      return SUCCESS_RESPONSE.SUCCESS_DELETE_MASTER;
    } catch (error) {
      throw new FailDeleteMasterException();
    }
  }

  async assginPermissionGroup(assginPermissionDto: AssginPermissionGroupDto) {
    try {
      const { userId, permissionGroups } = assginPermissionDto;
      await this.prisma.master.update({
        where: { id: userId },
        data: {
          permissions: {
            create: permissionGroups.map((row) => ({
              group: { connect: { id: row.permissionGroupId } },
              relatedId: userId,
              relatedType: "Master",
            })),
          },
        },
      });
      return SUCCESS_RESPONSE.SUCCESS_ASSGINED_PERMISSION_GROUP;
    } catch (error) {
      throw new FailToAssginPermissionGroupExpection();
    }
  }
}
