import { ArrayNotEmpty, IsArray, IsNotEmpty, Validate } from "class-validator";
import { EachPermissionIdNumber } from "src/common/src/dto/each-permission-id-number";
import { UniquePermissionId } from "src/common/src/dto/is-unique-permission-id";
import { NoSpecialCharConstraint } from "src/common/src/dto/no-special-character.rule";

interface PermissionsType {
  permissionId: number;
}

export class CreatePermissionGroupDto {
  @Validate(NoSpecialCharConstraint)
  @IsNotEmpty({ message: "Permission name is required" })
  name: string;

  @Validate(NoSpecialCharConstraint)
  description: string;

  @IsNotEmpty({ message: "Permission type is required" })
  type: string;

  @IsArray()
  @ArrayNotEmpty()
  @Validate(UniquePermissionId)
  @Validate(EachPermissionIdNumber)
  permissions: PermissionsType;
}
