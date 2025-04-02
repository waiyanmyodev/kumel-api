import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "UserA",
    description: "username of user!",
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "password123",
    description: "Password for master.",
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "User A",
    description: "User's name.",
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "This user is for testing!",
    description: "Remark For User.",
  })
  remark: string;
}
