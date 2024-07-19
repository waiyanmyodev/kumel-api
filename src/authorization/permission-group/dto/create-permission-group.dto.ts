import { IsNotEmpty } from "class-validator";

export class CreatePermissionGroupDto {
  @IsNotEmpty({ message: "Permission name is required" })
  name: string;
  description: string;
  type: string;
}
