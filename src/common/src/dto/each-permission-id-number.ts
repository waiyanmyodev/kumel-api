import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from "class-validator";

export const PERMISSION_ID_NUMBER = "permissionIdNumber";

@ValidatorConstraint({ name: PERMISSION_ID_NUMBER, async: false })
export class EachPermissionIdNumber implements ValidatorConstraintInterface {
  validate(value: { permissionId: number }[]) {
    if (!Array.isArray(value)) return false;
    const permissionIds = value.filter(
      (item) => typeof item.permissionId == "number"
    );
    return permissionIds.length === value.length ? true : false;
  }

  defaultMessage(): string {
    return "Each permissionId must be number";
  }
}
