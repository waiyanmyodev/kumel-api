import { PrismaService } from "../prisma/prisma.service";
import { hash } from "bcrypt";

export class AdminSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const admin = await this.prisma.admin.findFirst({
      where: {
        username: "server_admin",
      },
    });
    if (admin) {
      console.log("Admin already exit!");
      return;
    }
    const password = await hash("password123", 10);
    await this.prisma.admin.create({
      data: {
        username: "server_admin",
        password: password,
      },
    });
    console.log("Admin user seeding success!");
  }
}
