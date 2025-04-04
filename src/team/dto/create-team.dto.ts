import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTeamDto {
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

export class TeamDto {
  name: string;
  townshipId: string;
  imgPath: string;
  contact: string;
}
