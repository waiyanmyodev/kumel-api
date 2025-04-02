import { Injectable } from "@nestjs/common";
import { TeamDto } from "./dto/create-team.dto";
import { UpdateTeam } from "./dto/update-team.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { GeneralResponseMessageType } from "src/common/src/exception/general-type";
import { SUCCESS_RESPONSE } from "src/common/src/exception/success-response";
import {
  FailCreateTeamException,
  FailDeleteTeamException,
  FailToFindTeamExpection,
  FailUpdateTeamException,
} from "src/common/src/exception/general-exception";
import { Team } from "@prisma/client";

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTeamDto: TeamDto
    //relatedUser: RelatedUserDto
  ): Promise<GeneralResponseMessageType> {
    //  refactor  later for relatedUser
    try {
      await this.prisma.team.create({
        data: {
          ...createTeamDto,
          imgPath: createTeamDto.imgPath,
          townshipId: Number(createTeamDto.townshipId),
        },
      });
      return SUCCESS_RESPONSE.SUCCESS_CREATE_TEAM;
    } catch (error) {
      console.log(error);
      throw new FailCreateTeamException();
    }
  }

  async findAll(): Promise<GeneralResponseMessageType | Team[]> {
    try {
      const teams = await this.prisma.team.findMany();
      return teams;
    } catch (error) {
      throw new FailToFindTeamExpection();
    }
  }

  async findOne(
    user: any,
    id: number
  ): Promise<GeneralResponseMessageType | Team> {
    try {
      const team = await this.prisma.team.findFirst({
        where: {
          id: id,
        },
      });
      return team;
    } catch (error) {
      throw new FailToFindTeamExpection();
    }
  }

  async update(
    id: number,
    updateTeamDto: UpdateTeam
  ): Promise<GeneralResponseMessageType | Team> {
    try {
      const data = {
        ...updateTeamDto,
        imgPath: updateTeamDto.imgPath,
        townshipId: Number(updateTeamDto.townshipId),
      };
      await this.prisma.team.update({
        where: {
          id: Number(id),
        },
        data: data,
      });
      return SUCCESS_RESPONSE.SUCCESS_UPDATE_TEAM;
    } catch (error) {
      console.log(error);
      throw new FailUpdateTeamException();
    }
  }

  async remove(id: number): Promise<GeneralResponseMessageType> {
    try {
      await this.prisma.team.delete({
        where: {
          id: Number(id),
        },
      });
      return SUCCESS_RESPONSE.SUCCESS_TEAM_DELETE;
    } catch (error) {
      throw new FailDeleteTeamException();
    }
  }
}
