import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

export const NO_WHITE_SPACE = 'noWhitespace'

@ValidatorConstraint({ name: NO_WHITE_SPACE, async: false })
export class NoWhitespaceConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    const regex = /\s/
    return !regex.test(value)
  }
}
