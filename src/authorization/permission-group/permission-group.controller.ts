import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { PermissionGroupService } from "./permission-group.service";
import { CreatePermissionGroupDto } from "./dto/create-permission-group.dto";
import { UpdatePermissionGroupDto } from "./dto/update-permission-group.dto";
import { AdminJwtAuthGuard } from "src/common/src/guards/admin-jwt-auth.guard";

@Controller("permission-group")
@UseGuards(AdminJwtAuthGuard)
export class PermissionGroupController {
  constructor(
    private readonly permissionGroupService: PermissionGroupService
  ) {}

  @Post()
  create(@Body() createPermissionGroupDto: CreatePermissionGroupDto) {
    return this.permissionGroupService.create(createPermissionGroupDto);
  }

  @Get()
  findAll() {
    return this.permissionGroupService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.permissionGroupService.findOne(+id);
  }

  @Get("name/:name")
  findByName(@Param("name") name: string) {
    return this.permissionGroupService.findByName(name);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePermissionGroupDto: UpdatePermissionGroupDto
  ) {
    return this.permissionGroupService.update(+id, updatePermissionGroupDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.permissionGroupService.delete(+id);
  }
}
