import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {
  @ApiProperty({
    example: "READ_POST",
    description: "The name of the permission",
  })
  @IsNotEmpty({ message: "Permission name is required" })
  name: string;
}
