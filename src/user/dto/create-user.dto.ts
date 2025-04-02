import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: "1",
    description: "Agent id for user.",
  })
  agentId: number;

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
