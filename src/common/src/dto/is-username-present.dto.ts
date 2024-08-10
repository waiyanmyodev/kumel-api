import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Injectable } from '@nestjs/common'

export const USERNAME_PRESENT = 'userNamePresent'

@ValidatorConstraint({ name: USERNAME_PRESENT, async: true })
@Injectable()
export class IsUsernamePresent implements ValidatorConstraintInterface {
  async validate(username: string) {
    return !username
  }
}
