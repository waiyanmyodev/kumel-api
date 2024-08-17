import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MasterService } from "./master.service";
import { CreateMasterDto } from "./dto/create-master.dto";
import { UpdateMasterDto } from "./dto/update-master.dto";
import { AssginPermissionGroupDto } from "src/common/src/dto/assgin-permission-group.dto";
@Controller("admin/master")
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Post()
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.masterService.create(createMasterDto);
  }

  @Get()
  findAll() {
    return this.masterService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.masterService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMasterDto: UpdateMasterDto) {
    return this.masterService.update(+id, updateMasterDto);
  }

  @Post("assgin-permission")
  assginPermissionGroup(
    @Body() assginPermissionGroupDto: AssginPermissionGroupDto
  ) {
    return this.masterService.assginPermissionGroup(assginPermissionGroupDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.masterService.remove(+id);
  }
}
