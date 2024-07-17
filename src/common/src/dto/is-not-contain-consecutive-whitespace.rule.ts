import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { CONSECUTIVE_SPACE_CHECK_REGEXP, SPACE_ONLY_REGEXP } from '../../../constants/constants'

export const IS_NOT_CONTAIN_CONSECUTIVE_SPACE = 'isNotContainConsecutiveSpace'

@ValidatorConstraint({ name: IS_NOT_CONTAIN_CONSECUTIVE_SPACE, async: false })
export class IsNotContainConsecutiveSpace implements ValidatorConstraintInterface {
  validate(value: string) {
    if (SPACE_ONLY_REGEXP.test(value) || !CONSECUTIVE_SPACE_CHECK_REGEXP.test(value)) {
      return false
    }
    return true
  }

  validator(value: string) {
    console.log(`Return data from api ${value} `);
  }
}
