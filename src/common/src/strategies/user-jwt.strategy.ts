import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JWT_ACCESS_SECRET_KEY } from "src/constants/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtPayload } from "../types/jwtPayload.type";

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, "user-jwt") {
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
    const user = await this.prisma.user.findFirst({
      where: {
        username: payload.username,
      },
      include: {
        permissions: {
          where: {
            relatedType: "User",
          },
          include: {
            group: {
              include: {
                permissions: {
                  include: { permission: true },
                },
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const transformedPermissions = user.permissions.flatMap((permission) =>
      permission.group.permissions.map(
        (groupPermission) => groupPermission.permission
      )
    );

    return {
      ...user,
      permissions: transformedPermissions,
      type: "User",
    };
  }
}
