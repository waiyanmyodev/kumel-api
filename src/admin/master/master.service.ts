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
  FailUpdateMasterException,
  MasterNotFoundException,
} from "src/common/src/exception/general-exception";
import { SUCCESS_RESPONSE } from "src/common/src/exception/success-response";
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
      await this.prisma.master.create({ data: createMasterDto });
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
      await this.prisma.master.update({
        where: { id: Number(id) },
        data: updateMasterDto,
      });
      return SUCCESS_RESPONSE.SUCCESS_UPDATE_MASTER;
    } catch (error) {
      throw new FailUpdateMasterException();
    }
  }

  async remove(id: number): Promise<GeneralResponseMessageType> {
    try {
      await this.prisma.master.delete({ where: { id: Number(id) } });
      return SUCCESS_RESPONSE.SUCCESS_SMS_LOG_DELETE;
    } catch (error) {
      throw new FailDeleteMasterException();
    }
  }
}
