import { ArrayNotEmpty, IsArray, IsNotEmpty, Validate } from "class-validator";
import { EachPermissionGroupIdNumber } from "src/common/src/dto/each-permission-group-id-number";
import { UniquePermissionGroupId } from "src/common/src/dto/is-unique-permission-group-id";

interface PermissionGroupType {
  permissionGroupId: number;
}
export class AssginPermissionGroupDto {
  @IsNotEmpty({ message: "Master Id is required" })
  masterId: number;

  @IsArray()
  @ArrayNotEmpty()
  @Validate(UniquePermissionGroupId)
  @Validate(EachPermissionGroupIdNumber)
  permissionGroups: PermissionGroupType[];
}
