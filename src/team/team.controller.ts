import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { TeamService } from "./team.service";
import { UpdateTeamDto } from "./dto/update-team.dto";
import { User } from "src/common/src/decorator/current-user.decorator";
import { AuthUserTypeDto } from "src/common/src/dto/user-type.dto";
import { CreateTeamDto } from "./dto/create-team.dto";
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { uploadToLocal } from "src/utils/fileUpload";
@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post("/")
  @ApiOperation({ summary: "create a team" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
        name: {
          type: "string",
          example: "team A",
        },
        townshipId: {
          type: "string",
          example: 1,
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file", uploadToLocal))
  create(
    @User() user: AuthUserTypeDto,
    @UploadedFile() file: Express.Multer.File,
    @Body() createTeamDto: CreateTeamDto
  ) {
    const teamData = {
      ...createTeamDto,
      imgPath: file.path,
    };
    // const relatedUser = new RelatedUserDto(user);
    //return this.teamService.create(teamData, relatedUser);
    return this.teamService.create(teamData);
  }

  // @Post()
  // create(@User() user: AuthUserTypeDto, @Body() createTeamDto: CreateTeamDto) {
  //   const relatedUser = new RelatedUserDto(user);
  //   return this.teamService.create(createTeamDto, relatedUser);
  // }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(":id")
  findOne(@User() user, @Param("id") id: string) {
    return this.teamService.findOne(user, +id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "update a team" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
        name: {
          type: "string",
          example: "updated team A",
        },
        townshipId: {
          type: "string",
          example: 2,
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file", uploadToLocal))
  update(
    @Param("id") id: string,
    @Body() updateTeamDto: UpdateTeamDto,
    @UploadedFile() file: Express.Multer.File
    //@User() user: MasterDto | AgentDto
  ) {
    const updateData = {
      ...updateTeamDto,
      imgPath: file.path,
    };
    console.log(updateData);
    return this.teamService.update(+id, updateData);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.teamService.remove(+id);
  }
}
