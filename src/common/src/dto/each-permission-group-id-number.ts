import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from "class-validator";

export const PERMISSION_ID_NUMBER = "permissionGroupIdNumber";

@ValidatorConstraint({ name: PERMISSION_ID_NUMBER, async: false })
export class EachPermissionGroupIdNumber
  implements ValidatorConstraintInterface
{
  validate(value: { permissionGroupId: number }[]) {
    if (!Array.isArray(value)) return false;
    const permissionGroupIds = value.filter(
      (item) => typeof item.permissionGroupId == "number"
    );
    return permissionGroupIds.length === value.length ? true : false;
  }

  defaultMessage(): string {
    return "Each permissionGroupId must be number";
  }
}
