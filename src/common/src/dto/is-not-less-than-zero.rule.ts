import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

export const IS_NOT_LESS_THAN_ZERO = 'isNotLessthanZero'

@ValidatorConstraint({ name: IS_NOT_LESS_THAN_ZERO, async: false })
export class IsNotLessThanZero implements ValidatorConstraintInterface {
  validate(value: string) {
    if (Number(value) < 0) {
      return false
    }
    return true
  }
}
