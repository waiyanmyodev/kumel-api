import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isAlphanumeric,
  registerDecorator
} from 'class-validator'
import validator from 'validator'

export const IS_NOT_EMPTY_AND_IS_APLHANUMERIC = 'isNotEmptyAndIsAlphaNumeric'

@ValidatorConstraint({ name: IS_NOT_EMPTY_AND_IS_APLHANUMERIC, async: false })
export class IsNotEmptyAndIsAlphaNumericValidator implements ValidatorConstraintInterface {
  validate(value: string, args?: ValidationArguments) {
    if (value === '' || value.length < 1) {
      return true
    }
    let locale = void 0
    if (args !== null || args !== void 0) {
      locale = args.constraints[0]
    }
    return isAlphanumeric(value, locale)
  }
}

export function IsNotEmptyAndIsAlphaNumeric(
  locale: validator.AlphanumericLocale,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [locale],
      validator: IsNotEmptyAndIsAlphaNumericValidator
    })
  }
}
