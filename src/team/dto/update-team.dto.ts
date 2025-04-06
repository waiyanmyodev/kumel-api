import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTeamDto } from "./create-team.dto";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Man U",
    description: "Team name.",
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "contact@info.com",
    description: "Team Contact",
  })
  contact: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "1",
    description: "Township id.",
  })
  townshipId: string;

      @ApiProperty({ type: 'string', format: 'binary', required: false })
      @IsOptional()
      file?: Express.Multer.File;
}

export class UpdateTeam {
  name: string;
  imgPath: string;
  townshipId: string;
  contact: string;
}
