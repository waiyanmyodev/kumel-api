import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { TownshipService } from "./township.service";
import { CreateTownshipDto, UpdateTownshipDto } from "./dto/township.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Township")
@Controller("townships")
export class TownshipController {
  constructor(private readonly townshipService: TownshipService) {}

  @Post()
  create(@Body() createTownshipDto: CreateTownshipDto) {
    return this.townshipService.create(createTownshipDto);
  }

  @Get()
  findAll() {
    return this.townshipService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.townshipService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTownshipDto: UpdateTownshipDto
  ) {
    return this.townshipService.update(id, updateTownshipDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.townshipService.remove(id);
  }
}
