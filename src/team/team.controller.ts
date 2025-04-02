import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TeamService } from "./team.service";
import { UpdateTeamDto } from "./dto/update-team.dto";
import { User } from "src/common/src/decorator/current-user.decorator";
import { AuthUserTypeDto } from "src/common/src/dto/user-type.dto";
import { CreateTeamDto } from "./dto/create-team.dto";
import { RelatedUserDto } from "./dto/related-user.dto";

@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@User() user: AuthUserTypeDto, @Body() createTeamDto: CreateTeamDto) {
    const relatedUser = new RelatedUserDto(user);
    return this.teamService.create(createTeamDto, relatedUser);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(":id")
  findOne(@User() user, @Param("id") id: string) {
    return this.teamService.findOne(user, +id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.teamService.remove(+id);
  }
}
