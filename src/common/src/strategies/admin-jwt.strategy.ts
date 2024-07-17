import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JWT_ACCESS_SECRET_KEY } from "src/constants/constants";
import { JwtPayload } from "../../../admin/type/jwtPayload.type";
import { PrismaService } from "src/prisma/prisma.service";
import { Request } from "express";

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, "admin-jwt") {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies.Authentication,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get(JWT_ACCESS_SECRET_KEY),
    });
  }

  async validate(payload: JwtPayload) {
    const admin = await this.prisma.admin.findFirst({
      where: {
        username: payload.username,
      },
    });
    if (!admin) {
      throw new UnauthorizedException();
    }

    return admin;
  }
}
