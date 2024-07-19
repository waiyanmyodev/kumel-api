import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from "class-validator";

export const UNIQUE_PERMISSION_GROUP_ID = "uniquePermissionGroupId";

@ValidatorConstraint({ name: UNIQUE_PERMISSION_GROUP_ID, async: false })
export class UniquePermissionGroupId implements ValidatorConstraintInterface {
  validate(value: { permissionGroupId: number }[]) {
    if (!Array.isArray(value)) return false;
    const permissionGroupIds = value.map((item) => item.permissionGroupId);
    return permissionGroupIds.length === new Set(permissionGroupIds).size;
  }

  defaultMessage(): string {
    return "Each permissionGroupId must be unique";
  }
}
