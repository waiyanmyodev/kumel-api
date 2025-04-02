import { Exclude } from "class-transformer";

export class AdminDto {
  id: string;
  username: string;
  name: string;
  remark: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<AdminDto>) {
    Object.assign(this, partial);
  }
}
