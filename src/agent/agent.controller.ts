import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AgentService } from "./agent.service";
import { AgentAuthService } from "./auth.service";
import { AgentLoginDto } from "./dto/agent-login.dto";
import { Public } from "src/common/src/decorator/pubic.decorator";
import { Response } from "express";
import { User } from "src/common/src/decorator/current-user.decorator";
import { plainToClass } from "class-transformer";
import { AgentDto } from "./dto/agent.dto";
import { AgentType } from "./type/agent.type";
import { AgentJwtAuthGuard } from "src/common/src/guards/agent-jwt-auth.guard";
import { CreateAgentDto } from "./dto/create-agent.dto";
import { UpdateAgentDto } from "./dto/update-agent.dto";
import { AssginPermissionGroupToAgentDto } from "src/common/src/dto/assgin-permission-group-to-agent.dto";

@Controller("agent")
export class AgentController {
  constructor(
    private readonly agentService: AgentService,
    private readonly agentAuthService: AgentAuthService
  ) {}

  @Public()
  @Post("auth/login")
  login(
    @Body() agentLoginDto: AgentLoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.agentAuthService.login(agentLoginDto, response);
  }

  @UseGuards(AgentJwtAuthGuard)
  @Get("profile")
  profile(@User() user: AgentType) {
    return plainToClass(AgentDto, user);
  }

  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentService.create(createAgentDto);
  }

  @Get()
  findAll() {
    return this.agentService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.agentService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentService.update(+id, updateAgentDto);
  }

  @Post("assgin-permission")
  assginPermissionGroup(
    @Body() assginPermissionGroupDto: AssginPermissionGroupToAgentDto
  ) {
    return this.agentService.assginPermissionGroup(assginPermissionGroupDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.agentService.remove(+id);
  }
}
