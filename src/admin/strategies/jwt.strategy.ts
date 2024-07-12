import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JWT_ACCESS_SECRET_KEY } from "src/constants/constants";
import { JwtPayload } from "../type/jwtPayload.type";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
