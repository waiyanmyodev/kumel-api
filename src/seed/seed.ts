import { AdminSeeder } from "./admin.seed";
import { PermissionGroupSeeder } from "./permission-group.seed";
import { PermissionSeeder } from "./permission.seed";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";

export class DatabaseSeeder {
  constructor(private readonly prisma: PrismaService) {
    this.init();
  }

  private async init() {
    await new AdminSeeder(this.prisma).seed();
    await new PermissionSeeder(this.prisma).seed();
    await new PermissionGroupSeeder(this.prisma).seed();

    console.log("Database seeding success!");
  }
}

const config = new ConfigService();
const prismaService = new PrismaService(config);
new DatabaseSeeder(prismaService);
