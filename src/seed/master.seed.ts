import { PrismaService } from "../prisma/prisma.service";
import { hash } from "bcrypt";

export class MasterSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const admin = await this.prisma.admin.findFirst({
      where: {
        username: "server_admin",
      },
    });
    if (!admin) {
      console.log("Admin user does't exit, need to seed admin seeder!");
      return;
    }
    const master = await this.prisma.master.findFirst({
      where: {
        username: "Master01",
      },
    });
    if (master) {
      console.log("Master already exit!");
      return;
    }
    const password = await hash("password123", 10);
    await this.prisma.master.create({
      data: {
        adminId: admin.id,
        masterCode: "01XXX",
        username: "Master01",
        password: password,
      },
    });
    console.log("Master seeding success!");
  }
}
