import { Injectable } from "@nestjs/common";
import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { GeneralResponseMessageType } from "src/common/src/exception/general-type";
import { SUCCESS_RESPONSE } from "src/common/src/exception/success-response";
import {
  FailCreateTeamException,
  FailDeleteTeamException,
  FailToFindTeamExpection,
  FailUpdateTeamException,
} from "src/common/src/exception/general-exception";
import { RelatedUserDto } from "./dto/related-user.dto";
import { Team } from "@prisma/client";
import { AgentDto } from "src/agent/dto/agent.dto";
import { MasterDto } from "src/master/dto/master.dto";

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTeamDto: CreateTeamDto,
    relatedUser: RelatedUserDto
  ): Promise<GeneralResponseMessageType> {
    try {
      await this.prisma.team.create({
        data: {
          ...createTeamDto,
          ...relatedUser,
        },
      });
      return SUCCESS_RESPONSE.SUCCESS_CREATE_TEAM;
    } catch (error) {
      throw new FailCreateTeamException();
    }
  }

  async findAll(
    user: AgentDto | MasterDto
  ): Promise<GeneralResponseMessageType | Team[]> {
    try {
      const relatedList = await this.relatedUserList(user);
      const teams = await this.prisma.team.findMany({
        where: {
          relatedId: {
            in: relatedList,
          },
        },
      });
      return teams;
    } catch (error) {
      throw new FailToFindTeamExpection();
    }
  }

  async findOne(
    user: AgentDto | MasterDto,
    id: number
  ): Promise<GeneralResponseMessageType | Team> {
    try {
      const relatedList = await this.relatedUserList(user);
      const team = await this.prisma.team.findFirst({
        where: {
          id: id,
          relatedId: {
            in: relatedList,
          },
        },
      });
      return team;
    } catch (error) {
      throw new FailToFindTeamExpection();
    }
  }

  async update(
    id: number,
    updateTeamDto: UpdateTeamDto,
    user: AgentDto | MasterDto
  ): Promise<GeneralResponseMessageType | Team> {
    try {
      const relatedList = await this.relatedUserList(user);
      await this.prisma.team.update({
        where: {
          id: Number(id),
          relatedId: {
            in: relatedList,
          },
        },
        data: updateTeamDto,
      });
      return SUCCESS_RESPONSE.SUCCESS_UPDATE_TEAM;
    } catch (error) {
      throw new FailUpdateTeamException();
    }
  }

  async remove(
    id: number,
    user: AgentDto | MasterDto
  ): Promise<GeneralResponseMessageType> {
    try {
      const relatedList = await this.relatedUserList(user);
      await this.prisma.team.delete({
        where: {
          id: Number(id),
          relatedId: {
            in: relatedList,
          },
        },
      });
      return SUCCESS_RESPONSE.SUCCESS_TEAM_DELETE;
    } catch (error) {
      throw new FailDeleteTeamException();
    }
  }

  private async relatedUserList(user: MasterDto | AgentDto) {
    const relatedList = [];
    if (user.type == "Master") {
      relatedList.push(user.id);
      (user as MasterDto).agents.forEach((agent) => relatedList.push(agent.id));
    }
    if (user.type == "Agent") {
      const master = await this.prisma.master.findFirst({
        where: { masterCode: (user as AgentDto).masterCode },
        include: { agents: true },
      });
      relatedList.push(master.id);
      master.agents.forEach((agent) => relatedList.push(agent.id));
    }
    return relatedList;
  }
}
