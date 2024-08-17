import { Injectable } from '@nestjs/common';
import { Agent } from "@prisma/client";
import { AssginPermissionGroupToAgentDto } from "src/common/src/dto/assgin-permission-group-to-agent.dto";
import {
  AgentNotFoundException,
  FailCreateAgentException,
  FailDeleteAgentException,
  FailedToGetAgentByDateExpection,
  FailToAssginPermissionGroupExpection,
  FailUpdateAgentException,
} from "src/common/src/exception/general-exception";
import { GeneralResponseMessageType } from "src/common/src/exception/general-type";
import { SUCCESS_RESPONSE } from "src/common/src/exception/success-response";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAgentDto } from "./dto/create-agent.dto";
import { UpdateMasterDto } from "src/admin/master/dto/update-master.dto";
import { hash } from "bcrypt";

@Injectable()
export class AgentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Agent[] | GeneralResponseMessageType> {
    try {
      return await this.prisma.agent.findMany({ take: 20 });
    } catch (error) {
      new FailedToGetAgentByDateExpection();
    }
  }

  async create(
    createAgentDto: CreateAgentDto
  ): Promise<GeneralResponseMessageType> {
    try {
      const password = await hash(createAgentDto.password, 10);
      await this.prisma.agent.create({
        data: {
          ...createAgentDto,
          password: password,
        },
      });
      return SUCCESS_RESPONSE.SUCCESS_CREATE_AGENT;
    } catch (error) {
      throw new FailCreateAgentException();
    }
  }

  async findOne(id: number): Promise<Agent> {
    try {
      return await this.prisma.agent.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      throw new AgentNotFoundException();
    }
  }

  async update(
    id: number,
    updateMasterDto: UpdateMasterDto
  ): Promise<GeneralResponseMessageType> {
    try {
      await this.prisma.agent.update({
        where: { id: Number(id) },
        data: updateMasterDto,
      });
      return SUCCESS_RESPONSE.SUCCESS_UPDATE_AGENT;
    } catch (error) {
      throw new FailUpdateAgentException();
    }
  }

  async remove(id: number): Promise<GeneralResponseMessageType> {
    try {
      await this.prisma.agent.delete({ where: { id: Number(id) } });
      return SUCCESS_RESPONSE.SUCCESS_AGENT_DELETE;
    } catch (error) {
      throw new FailDeleteAgentException();
    }
  }

  async assginPermissionGroup(
    assginPermissionDto: AssginPermissionGroupToAgentDto
  ) {
    try {
      const { agentId, permissionGroups } = assginPermissionDto;
      await this.prisma.agent.update({
        where: { id: agentId },
        data: {
          permissions: {
            create: permissionGroups.map((row) => ({
              group: { connect: { id: row.permissionGroupId } },
              relatedId: agentId,
              relatedType: "Agent",
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
