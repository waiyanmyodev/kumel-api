import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

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
    example: "teams/manu-logo.png",
    description: "Logo image for team.",
  })
  imgPath: string;
}
