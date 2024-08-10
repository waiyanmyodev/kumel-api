import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JWT_ACCESS_SECRET_KEY } from "src/constants/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { Request } from "express";
import JwtPayload from "../types";

@Injectable()
export class MasterJwtStrategy extends PassportStrategy(
  Strategy,
  "master-jwt"
) {
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
    const master = await this.prisma.master.findFirst({
      where: {
        username: payload.username,
      },
      include: {
        permissions: {
          where: {
            relatedType: "Master",
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
    if (!master) {
      throw new UnauthorizedException();
    }

    const transformedPermissions = master.permissions.flatMap((permission) =>
      permission.group.permissions.map(
        (groupPermission) => groupPermission.permission
      )
    );

    return {
      ...master,
      permissions: transformedPermissions,
    };

  }
}
