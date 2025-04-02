import { Injectable } from "@nestjs/common";
import { AssginPermissionGroupDto } from "src/common/src/dto/assgin-permission-group.dto";
import { FailToAssginPermissionGroupExpection } from "src/common/src/exception/general-exception";
import { SUCCESS_RESPONSE } from "src/common/src/exception/success-response";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  async assginPermissionGroup(assginPermissionDto: AssginPermissionGroupDto) {
    try {
      const { userId, permissionGroups } = assginPermissionDto;
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          permissions: {
            create: permissionGroups.map((row) => ({
              group: { connect: { id: row.permissionGroupId } },
              relatedId: userId,
              relatedType: "Admin",
            })),
          },
        },
      });
      return SUCCESS_RESPONSE.SUCCESS_ASSGINED_PERMISSION_GROUP;
    } catch (error) {
      throw new FailToAssginPermissionGroupExpection();
    }
  }
}
