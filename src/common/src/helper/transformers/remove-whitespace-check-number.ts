import { NUM_ONLY_REGEXP, SPACE_ONLY_REGEXP } from '../../../../constants/constants'
import { InvalidFullnameException } from '../../exception/general-exception'

export const removeWhiteSpaceAndChangeStringNumberToNumber = ({ value }) => {
  if (value !== '' && SPACE_ONLY_REGEXP.test(value)) {
    throw new InvalidFullnameException()
  } else if (NUM_ONLY_REGEXP.test(String(value).trim())) {
    return +value
  }
  return String(value).trim()
}
