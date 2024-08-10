import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

export const CHECK_EMPTY_OR_NUMBER_STRING = 'checkEmptyOrNumberString'

@ValidatorConstraint({ name: CHECK_EMPTY_OR_NUMBER_STRING, async: false })
export class CheckEmptyOrNumberString implements ValidatorConstraintInterface {
  validate(value: string) {
    if (value === '') {
      return true
    }

    return /^\d+$/.test(value)
  }
}
