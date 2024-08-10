import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

export const IS_NOT_LOCKED = 'isNotLocked'

@ValidatorConstraint({ name: IS_NOT_LOCKED, async: false })
export class IsNotLockedValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const { object } = args
    const isLocked = object['isLocked']
    return isLocked
  }
}
