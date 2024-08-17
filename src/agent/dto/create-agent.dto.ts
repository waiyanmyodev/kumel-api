import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class CreateAgentDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: "Master Id",
    description: "The owner of the agent",
  })
  masterId: number;

  @IsString()
  @Length(1, 5)
  @IsNotEmpty()
  @ApiProperty({
    example: "1AM221",
    description: "Master unique code.",
  })
  masterCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "TestAgent",
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

  @IsBoolean()
  @ApiProperty({
    example: false,
    description: "Disabled or not .",
  })
  isLocked: boolean;
}
