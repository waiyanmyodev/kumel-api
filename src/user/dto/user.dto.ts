import { Exclude } from "class-transformer";

export class UserDto {
  id: string;
  username: string;
  name: string;
  remark: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
