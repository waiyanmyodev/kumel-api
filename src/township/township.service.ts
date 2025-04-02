import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTownshipDto, UpdateTownshipDto } from "./dto";

@Injectable()
export class TownshipService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTownshipDto) {
    return this.prisma.township.create({ data });
  }

  async findAll() {
    return this.prisma.township.findMany({ include: { city: true } });
  }

  async findOne(id: number) {
    const township = await this.prisma.township.findUnique({
      where: { id },
      include: { city: true },
    });
    if (!township) throw new NotFoundException("Township not found");
    return township;
  }

  async update(id: number, data: UpdateTownshipDto) {
    await this.findOne(id);
    return this.prisma.township.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.township.delete({ where: { id } });
  }
}
