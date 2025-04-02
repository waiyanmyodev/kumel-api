import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CityDto } from "./dto";

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async create(data: CityDto) {
    return this.prisma.city.create({ data });
  }

  async findAll() {
    return this.prisma.city.findMany({ include: { Township: true } });
  }

  async findOne(id: number) {
    const city = await this.prisma.city.findUnique({
      where: { id },
      include: { Township: true },
    });
    if (!city) throw new NotFoundException("City not found");
    return city;
  }

  async update(id: number, data: CityDto) {
    await this.findOne(id);
    return this.prisma.city.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.city.delete({ where: { id } });
  }
}
