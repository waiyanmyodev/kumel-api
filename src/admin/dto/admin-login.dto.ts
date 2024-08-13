import { ApiProperty } from "@nestjs/swagger";

export class AdminLoginDto {
  @ApiProperty({
    example: "admin",
    description: "The username of the admin",
  })
  username: string;
  @ApiProperty({
    example: "password123",
    description: "The password of the user",
  })
  password: string;
}
