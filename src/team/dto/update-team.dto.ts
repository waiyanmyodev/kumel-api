import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTeamDto } from "./create-team.dto";
import { IsNotEmpty, IsString } from "class-validator";

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
    example: "teams/manu-logo.png",
    description: "Logo image for team.",
  })
  imgPath: string;
}
