import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class CreateMasterDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: "Admin Id",
    description: "The owner of the master",
  })
  adminId: number;

  @IsString()
  @Length(1, 5)
  @IsNotEmpty()
  @ApiProperty({
    example: "1AM2XAPA",
    description: "Master unique code.",
  })
  masterCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "TestMaster",
    description: "Username for master.",
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "password123",
    description: "Password for master.",
  })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "/profile/avatar/default.svg",
    description: "Avatar for master profile.",
  })
  avatar?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "For just testing ",
    description: "remark for master profile.",
  })
  remark?: string;
}
