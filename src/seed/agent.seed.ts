import { PrismaService } from "../prisma/prisma.service";
import { hash } from "bcrypt";

export class AgentSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const master = await this.prisma.master.findFirst({
      where: {
        username: "Master01",
      },
    });
    if (!master) {
      console.log("Master user does't exit, need to seed master seeder!");
      return;
    }
    const agent = await this.prisma.agent.findFirst({
      where: {
        username: "Agent01",
      },
    });
    if (agent) {
      console.log("Agent already exit!");
      return;
    }
    const password = await hash("password123", 10);
    await this.prisma.agent.create({
      data: {
        masterId: master.id,
        masterCode: "01XXX",
        username: "Agent01",
        password: password,
        isLocked: false,
      },
    });
    console.log("Agent seeding success!");
  }
}
