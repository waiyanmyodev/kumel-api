import { Injectable } from '@nestjs/common'
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from 'class-validator'
import { VALID_BOOLEAN_STRINGS } from '../../../constants/constants'

export const IS_VALID_BOOLEAN = 'isValidBoolean'

@ValidatorConstraint({ name: IS_VALID_BOOLEAN })
@Injectable()
export class BooleanValidator implements ValidatorConstraintInterface {
  async validate(value: string | boolean) {
    if (typeof value === 'boolean' || VALID_BOOLEAN_STRINGS.includes(value)) {
      return true
    }
    return false
  }
}

export function IsValidBoolean(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: BooleanValidator
    })
  }
}
