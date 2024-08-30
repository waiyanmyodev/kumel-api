import { Injectable } from "@nestjs/common";
import { AgentLoginDto } from "./dto/agent-login.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { FailedLoginException } from "src/common/src/exception/general-exception";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { AuthenticationToken } from "src/admin/type/authencationToken.type";
import { TokenEnum } from "src/admin/type/jwtPayload.type";
import { AgentJwtPayload } from "src/common/src/types/jwtPayload.type";
@Injectable()
export class AgentAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login(agentLoginDto: AgentLoginDto, response: Response) {
    const { username, password, masterCode } = agentLoginDto;
    const agent = await this.prisma.agent.findFirst({
      where: {
        masterCode: masterCode,
        username: username,
      },
    });
    if (!agent || !compareSync(password, agent.password)) {
      throw new FailedLoginException();
    }
    const [access_token, refresh_token] = await Promise.all([
      this.generateToken(
        {
          masterCode: agent.masterCode,
          username: agent.username,
          token_type: TokenEnum.ACCESS,
        },
        this.configService.get("JWT_ACCESS_SECRET")
      ),
      this.generateToken(
        {
          masterCode: agent.masterCode,
          username: agent.username,
          token_type: TokenEnum.REFRESH,
        },
        this.configService.get("JWT_REFRESH_SECRET"),
        "4h"
      ),
    ]);

    response.cookie("AgentAuthentication", access_token, {
      secure: this.configService.get("PRODUCTION") == "true" ? true : false,
      httpOnly: true,
    });

    return { access_token, refresh_token };
  }

  async refresh(userId: number, rt: string): Promise<AuthenticationToken> {
    const agent = await this.prisma.agent.findFirst({
      where: {
        id: userId,
      },
    });

    const at = await this.generateToken(
      {
        masterCode: agent.masterCode,
        username: agent.username,
        token_type: TokenEnum.ACCESS,
      },
      this.configService.get("JWT_ACCESS_SECRET")
    );
    return { access_token: at, refresh_token: rt, type: "Bearer" };
  }

  private async generateToken(
    payload: AgentJwtPayload,
    secret: string,
    expiresIn = "15m"
  ) {
    const token = await this.jwt.signAsync(payload, { expiresIn, secret });
    return token;
  }
}
