import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Yangon",
    description: "The name of the city",
  })
  name: string;
}
