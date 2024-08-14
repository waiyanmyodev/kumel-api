import { ApiProperty } from "@nestjs/swagger";

export class MasterLoginDto {
  @ApiProperty({
    example: "master",
    description: "The username of the admin",
  })
  username: string;
  @ApiProperty({
    example: "password123",
    description: "The password of the user",
  })
  password: string;
}
