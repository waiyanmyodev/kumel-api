import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { CityService } from "./city.service";
import { CityDto } from "./dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminJwtAuthGuard } from "src/common/src/guards/admin-jwt-auth.guard";

@ApiTags("City")
@Controller("cities")
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  create(@Body() createCityDto: CityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  @Get(":id")
  @UseGuards(AdminJwtAuthGuard)
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.cityService.findOne(id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCityDto: CityDto
  ) {
    return this.cityService.update(id, updateCityDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.cityService.remove(id);
  }
}
