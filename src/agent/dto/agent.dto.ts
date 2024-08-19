import { Master } from "@prisma/client";
import { Exclude } from "class-transformer";

export class AgentDto {
  id: string;
  username: string;
  masterCode: string;
  @Exclude()
  password: string;
  master: Master;
  type: string;

  constructor(partial: Partial<AgentDto>) {
    Object.assign(this, partial);
  }
}
