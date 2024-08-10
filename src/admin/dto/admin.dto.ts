import { Exclude } from "class-transformer";

export class AdminDto {
  id: string;
  username: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<AdminDto>) {
    Object.assign(this, partial);
  }
}
