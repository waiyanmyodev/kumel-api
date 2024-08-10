import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

export const IS_NOT_CONTAIN_SPACE = 'checkContainSpace'

@ValidatorConstraint({ name: IS_NOT_CONTAIN_SPACE, async: false })
export class IsNotContainSpace implements ValidatorConstraintInterface {
  validate(value: string) {
    if (String(value).includes(' ')) {
      return false
    }
    return true
  }
}
