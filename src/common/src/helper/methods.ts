import { DOB_FORMAT, DOB_FORMAT_REGEXP } from '../../../constants/constants'
import { InvalidDateFormatException } from '../exception/general-exception'
import { endOfDay, parse } from 'date-fns'

export const isEmpty = (value: any): boolean => {
  if (!value) return true
  return typeof value === 'object' && Object.keys(value).length === 0
}

export const DobTransform = ({ value }) => {
  if (value === '') {
    return (value = undefined)
  }
  if (!DOB_FORMAT_REGEXP.test(value)) {
    throw new InvalidDateFormatException()
  }
  return endOfDay(parse(value, DOB_FORMAT, new Date()))
}
