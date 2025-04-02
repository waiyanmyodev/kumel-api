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
import { CityService } from "./city.service";
import { CityDto } from "./dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("City")
@Controller("cities")
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  create(@Body() createCityDto: CityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.cityService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCityDto: CityDto
  ) {
    return this.cityService.update(id, updateCityDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.cityService.remove(id);
  }
}
