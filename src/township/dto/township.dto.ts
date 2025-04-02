import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class CreateTownshipDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Hlaing",
    description: "The name of the township",
  })
  name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: "The id of the city",
  })
  cityId: number;
}

export class UpdateTownshipDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Hlaing",
    description: "The name of the township",
  })
  name: string;

  @IsInt()
  @ApiProperty({
    example: 1,
    description: "The id of the city",
  })
  @IsNotEmpty()
  cityId: number;
}
