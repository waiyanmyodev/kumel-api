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
import { TownshipService } from "./township.service";
import { CreateTownshipDto, UpdateTownshipDto } from "./dto/township.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminJwtAuthGuard } from "src/common/src/guards/admin-jwt-auth.guard";
import { Public } from "src/common/src/decorator/pubic.decorator";

@ApiBearerAuth()
@ApiTags("Township")
@UseGuards(AdminJwtAuthGuard)
@Controller("townships")
export class TownshipController {
  constructor(private readonly townshipService: TownshipService) {}

  @Post()
  create(@Body() createTownshipDto: CreateTownshipDto) {
    return this.townshipService.create(createTownshipDto);
  }

  @Public()
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
