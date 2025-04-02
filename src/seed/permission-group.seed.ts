import { PrismaService } from "../prisma/prisma.service";

export class PermissionGroupSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const permissionGroups = [
      {
        name: "Admin Access",
        description: "Description",
        type: "ADMIN",
      },
      {
        name: "Logger Access",
        description: "Description",
        type: "LOG",
      },
      {
        name: "Master Access",
        description: "Description",
        type: "MASTER",
      },
    ];
    await this.prisma.permissionGroup.createMany({
      data: permissionGroups,
    });
    console.log("Permission Group seeding success!");
  }
}
