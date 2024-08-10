import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
export const IS_NOT_SCAMMER = 'isNotScammer'
@ValidatorConstraint({ name: IS_NOT_SCAMMER, async: false })
export class IsNotScammerValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const { object } = args
    const isScammer = object['isScammer']
    return isScammer
  }
}
