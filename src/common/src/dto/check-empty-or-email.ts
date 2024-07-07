import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { EMAIL_FORMAT_REGEXP } from '../../../constants/constants'

export const CHECK_EMPTY_OR_EMAIL = 'checkEmptyOrEmail'

@ValidatorConstraint({ name: CHECK_EMPTY_OR_EMAIL, async: false })
export class CheckEmptyOrEmail implements ValidatorConstraintInterface {
  validate(value: string) {
    if (value === '') {
      return true
    }

    return EMAIL_FORMAT_REGEXP.test(value)
  }
}
