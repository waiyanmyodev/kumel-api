import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, Validate } from "class-validator";
import { EachPermissionIdNumber } from "src/common/src/dto/each-permission-id-number";
import { UniquePermissionId } from "src/common/src/dto/is-unique-permission-id";
import { NoSpecialCharConstraint } from "src/common/src/dto/no-special-character.rule";

interface PermissionsType {
  permissionId: number;
}

export class CreatePermissionGroupDto {
  @Validate(NoSpecialCharConstraint)
  @ApiProperty({
    example: "AdminPermission",
    description: "The name of the permission group",
  })
  @IsNotEmpty({ message: "Permission group name is required" })
  name: string;

  @ApiProperty({
    example: "Description....",
    description: "The description of the permission group",
  })
  @Validate(NoSpecialCharConstraint)
  description: string;

  @ApiProperty({
    example: "ADMIN",
    description: "The type of the permission group",
  })
  @IsNotEmpty({ message: "Permission group type is required" })
  type: string;

  @IsArray()
  @ArrayNotEmpty()
  @Validate(UniquePermissionId)
  @Validate(EachPermissionIdNumber)
  permissions: PermissionsType;
}
