import { Exclude } from "class-transformer";

export class MasterDto {
  id: string;
  username: string;
  masterCode: string;
  @Exclude()
  password: string;

  constructor(partial: Partial<MasterDto>) {
    Object.assign(this, partial);
  }
}
