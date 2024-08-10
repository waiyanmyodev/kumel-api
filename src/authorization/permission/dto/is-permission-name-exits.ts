import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Injectable } from "@nestjs/common";
import { PermissionService } from "../permission.service";

export const PERMISSION_CONSTRAINT_NAME = "permissionNameExists";

@ValidatorConstraint({ name: PERMISSION_CONSTRAINT_NAME, async: true })
@Injectable()
export class IsPermissionNameExists implements ValidatorConstraintInterface {
  constructor(private readonly permissionService: PermissionService) {}

  async validate(name: string): Promise<boolean> {
    const isPermissionExists = await this.permissionService.findByName(name);
    return !isPermissionExists;
  }

  defaultMessage(): string {
    return "Permission name must be unique";
  }
}
