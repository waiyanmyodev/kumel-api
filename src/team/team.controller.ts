import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { TeamService } from "./team.service";
import { UpdateTeamDto } from "./dto/update-team.dto";
import { AuthUserGuard } from "src/common/src/guards/auth-user.guard";
import { User } from "src/common/src/decorator/current-user.decorator";
import { AuthUserTypeDto } from "src/common/src/dto/user-type.dto";
import { CreateTeamDto } from "./dto/create-team.dto";
import { RelatedUserDto } from "./dto/related-user.dto";
import { MasterDto } from "src/master/dto/master.dto";
import { AgentDto } from "src/agent/dto/agent.dto";

@UseGuards(AuthUserGuard)
@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@User() user: AuthUserTypeDto, @Body() createTeamDto: CreateTeamDto) {
    const relatedUser = new RelatedUserDto(user);
    return this.teamService.create(createTeamDto, relatedUser);
  }

  @Get()
  findAll(@User() user: MasterDto | AgentDto) {
    return this.teamService.findAll(user);
  }

  @Get(":id")
  findOne(@User() user: MasterDto | AgentDto, @Param("id") id: string) {
    return this.teamService.findOne(user, +id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTeamDto: UpdateTeamDto,
    @User() user: MasterDto | AgentDto
  ) {
    return this.teamService.update(+id, updateTeamDto, user);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @User() user: MasterDto | AgentDto) {
    return this.teamService.remove(+id, user);
  }
}
