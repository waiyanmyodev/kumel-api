import { PrismaService } from "../prisma/prisma.service";

export class PermissionSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const permissions = [
      {
        name: "read-admin",
      },
      {
        name: "create-admin",
      },
      {
        name: "update-admin",
      },
      {
        name: "delete-admin",
      },

      {
        name: "read-master",
      },
      {
        name: "create-master",
      },
      {
        name: "update-master",
      },
      {
        name: "delete-master",
      },

      {
        name: "read-permission",
      },
      {
        name: "create-permission",
      },
      {
        name: "update-permission",
      },
      {
        name: "delete-permission",
      },

      {
        name: "read-permission-group",
      },
      {
        name: "create-permission-group",
      },
      {
        name: "update-permission-group",
      },
      {
        name: "delete-permission-group",
      },

      {
        name: "read-agent",
      },
      {
        name: "create-agent",
      },
      {
        name: "update-agent",
      },
      {
        name: "delete-agent",
      },
      {
        name: "assgin-agent",
      },

      {
        name: "read-team",
      },
      {
        name: "create-team",
      },
      {
        name: "update-team",
      },
      {
        name: "delete-team",
      },

      {
        name: "read-league",
      },
      {
        name: "create-league",
      },
      {
        name: "update-league",
      },
      {
        name: "delete-league",
      },

      {
        name: "read-report",
      },
      {
        name: "generate-report",
      },
      {
        name: "delete-report",
      },

      {
        name: "read-admin-log",
      },
      {
        name: "read-master-log",
      },
      {
        name: "read-agent-log",
      },
    ];
    await this.prisma.permission.createMany({
      data: permissions,
    });
    console.log("Permissions seeding success!");
  }
}
