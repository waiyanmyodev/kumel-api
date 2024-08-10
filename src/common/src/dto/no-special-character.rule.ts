import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { NO_SPECIAL_CHAR_REGEXP } from "../../../constants/constants";

export const NO_SPECIAL_CHAR = "noSpecialChar";

@ValidatorConstraint({ name: NO_SPECIAL_CHAR, async: false })
export class NoSpecialCharConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    return NO_SPECIAL_CHAR_REGEXP.test(value);
  }

  defaultMessage(): string {
    return `Can't contain special character!`;
  }
}
