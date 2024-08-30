import { Injectable } from "@nestjs/common";
import { MasterLoginDto } from "./dto/master-login.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { FailedLoginException } from "src/common/src/exception/general-exception";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { AuthenticationToken } from "src/admin/type/authencationToken.type";
import { JwtPayload, TokenEnum } from "src/admin/type/jwtPayload.type";
@Injectable()
export class MasterAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login(masterLoginDto: MasterLoginDto, response: Response) {
    const { username, password } = masterLoginDto;
    const master = await this.prisma.master.findUnique({
      where: {
        username: username,
      },
    });
    if (!master || !compareSync(password, master.password)) {
      throw new FailedLoginException();
    }
    const [access_token, refresh_token] = await Promise.all([
      this.generateToken(
        {
          username: master.username,
          token_type: TokenEnum.ACCESS,
        },
        this.configService.get("JWT_ACCESS_SECRET")
      ),
      this.generateToken(
        {
          username: master.username,
          token_type: TokenEnum.REFRESH,
        },
        this.configService.get("JWT_REFRESH_SECRET"),
        "4h"
      ),
    ]);

    response.cookie("Authentication", access_token, {
      secure: this.configService.get("PRODUCTION") == "true" ? true : false,
      httpOnly: true,
    });

    return { access_token, refresh_token };
  }

  async refresh(userId: number, rt: string): Promise<AuthenticationToken> {
    const master = await this.prisma.master.findUnique({
      where: {
        id: userId,
      },
    });

    const at = await this.generateToken(
      {
        username: master.username,
        token_type: TokenEnum.ACCESS,
      },
      this.configService.get("JWT_ACCESS_SECRET")
    );
    return { access_token: at, refresh_token: rt, type: "Bearer" };
  }

  private async generateToken(
    payload: JwtPayload,
    secret: string,
    expiresIn = "15m"
  ) {
    const token = await this.jwt.signAsync(payload, { expiresIn, secret });
    return token;
  }
}
