import { ApiProperty } from "@nestjs/swagger";

export class AgentLoginDto {
  @ApiProperty({
    example: "XXXXX",
    description: "The Master Code of the agent",
  })
  masterCode: string;
  @ApiProperty({
    example: "AgentBZ",
    description: "The username of the agent",
  })
  username: string;
  @ApiProperty({
    example: "password123",
    description: "The password of the agent",
  })
  password: string;
}
