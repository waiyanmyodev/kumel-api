import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
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
}
