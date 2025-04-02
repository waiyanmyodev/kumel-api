import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JWT_ACCESS_SECRET_KEY } from "src/constants/constants";
import { PrismaService } from "src/prisma/prisma.service";
import { AgentJwtPayload } from "../types/jwtPayload.type";

@Injectable()
export class AgentJwtStrategy extends PassportStrategy(Strategy, "agent-jwt") {
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

  async validate(payload: AgentJwtPayload) {
    const agent = await this.prisma.agent.findFirst({
      where: {
        masterCode: payload.masterCode,
        username: payload.username,
      },
      include: {
        permissions: {
          where: {
            relatedType: "Agent",
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
        master: true,
      },
    });
    if (!agent) {
      throw new UnauthorizedException();
    }
    const transformedPermissions = agent.permissions.flatMap((permission) =>
      permission.group.permissions.map(
        (groupPermission) => groupPermission.permission
      )
    );

    return {
      ...agent,
      permissions: transformedPermissions,
      type: "Agent",
    };
  }
}
