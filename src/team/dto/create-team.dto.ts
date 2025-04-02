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
    example: "1",
    description: "Township id.",
  })
  townshipId: string;
}

export class TeamDto {
  name: string;
  townshipId: string;
  imgPath: string;
}
