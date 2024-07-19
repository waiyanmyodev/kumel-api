import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from "class-validator";

export const UNIQUE_PERMISSION_ID = "uniquePermissionId";

@ValidatorConstraint({ name: UNIQUE_PERMISSION_ID, async: false })
export class UniquePermissionId implements ValidatorConstraintInterface {
  validate(value: { permissionId: number }[]) {
    if (!Array.isArray(value)) return false;
    const permissionIds = value.map((item) => item.permissionId);
    return permissionIds.length === new Set(permissionIds).size;
  }

  defaultMessage(): string {
    return "Each permissionId must be unique";
  }
}
