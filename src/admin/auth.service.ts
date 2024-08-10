import { Injectable } from "@nestjs/common";
import { AdminLoginDto } from "./dto/admin-login.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { FailedLoginException } from "src/common/src/exception/general-exception";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthenticationToken } from "./type/authencationToken.type";
import { Response } from "express";
import { JwtPayload, TokenEnum } from "./type/jwtPayload.type";

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login(adminLoginDto: AdminLoginDto, response: Response) {
    const { username, password } = adminLoginDto;
    const admin = await this.prisma.admin.findUnique({
      where: {
        username: username,
      },
    });
    if (!admin || !compareSync(password, admin.password)) {
      throw new FailedLoginException();
    }
    const [access_token, refresh_token] = await Promise.all([
      this.generateToken(
        {
          username: admin.username,
          token_type: TokenEnum.ACCESS,
        },
        this.configService.get("JWT_ACCESS_SECRET")
      ),
      this.generateToken(
        {
          username: admin.username,
          token_type: TokenEnum.REFRESH,
        },
        this.configService.get("JWT_REFRESH_SECRET"),
        "4h"
      ),
    ]);

    response.cookie("Authentication", access_token, {
      secure: true,
      httpOnly: true,
    });

    return { access_token, refresh_token };
  }

  async refresh(userId: number, rt: string): Promise<AuthenticationToken> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id: userId,
      },
    });

    const at = await this.generateToken(
      {
        username: admin.username,
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
