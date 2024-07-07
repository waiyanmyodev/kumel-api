import {
  MAX_LENGTH_FULLNAME,
  MAX_LENGTH_NAME,
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_FULLNAME,
  MIN_LENGTH_NAME,
  MIN_LENGTH_PASSWORD,
  MAX_LENGTH_EMAIL,
  MIN_LENGTH_EMAIL,
} from '../../../constants/constants'

export const GENERAL_VALIDATOR_RESPONSE = {
  UNEXPECTED_ERROR: {
    status: 'UNEXPECTED_ERROR',
    message: 'An unexpected error occurred. Please try again later'
  },
  EMPTY_USERNAME: {
    status: 'EMPTY_USERNAME',
    message: 'Your username is required'
  },
  MIN_LENGTH_USERNAME: {
    status: 'MIN_LENGTH_USERNAME',
    message: `Please do not enter less than ${MIN_LENGTH_NAME} characters.`
  },
  MAX_LENGTH_USERNAME: {
    status: 'MAX_LENGTH_USERNAME',
    message: `Not allow user to input more ${MAX_LENGTH_NAME} characters.`
  },
  INVALID_USERNAME: {
    status: 'INVALID_USERNAME',
    message: 'Invalid username format, spaces and special characters are not allowed'
  },
  EXIST_USERNAME: {
    status: 'EXIST_USERNAME',
    message: 'This user has been registered with the system, please check again'
  },
  EMPTY_PASSWORD: {
    status: 'EMPTY_PASSWORD',
    message: 'Password is required'
  },
  INVALID_PASS: {
    status: 'INVALID_PASS',
    message: 'Password must not contain spaces'
  },
  MIN_LENGTH_PASSWORD: {
    status: 'MIN_LENGTH_PASSWORD',
    message: `Please do not enter less than ${MIN_LENGTH_PASSWORD} characters.`
  },
  MAX_LENGTH_PASSWORD: {
    status: 'MAX_LENGTH_PASSWORD',
    message: `Not allow user to input more ${MAX_LENGTH_PASSWORD} characters.`
  },
  PASSWORD_POLICY: {
    status: 'PASSWORD_POLICY',
    message: `Password minimum ${MIN_LENGTH_PASSWORD} characters. Include at least 1 uppercase letter, lowercase letter, number and special character.`
  },
  INVALID_EMAIL: {
    status: 'INVALID_EMAIL',
    message: 'Invalid Email Format'
  },
  EMPTY_EMAIL: {
    status: 'EMPTY_EMAIL',
    message: 'Email is required'
  },
  MAX_LENGTH_EMAIL: {
    status: 'MAX_LENGTH_EMAIL',
    message: `Email must be between ${MIN_LENGTH_EMAIL} and ${MAX_LENGTH_EMAIL} characters.`
  },
  INVALID_IS_LOCKED: {
    status: 'INVALID_IS_LOCK',
    message: 'isLocked is required'
  },
  IS_LOCK: {
    status: 'IS_LOCK',
    message: 'User account is locked'
  },
  MIN_LENGTH_TRADER_USERNAME: {
    status: 'MIN_LENGTH_TRADER_USERNAME',
    message: `Please do not enter less than ${MIN_LENGTH_NAME} characters.`
  },
  MAX_LENGTH_TRADER_USERNAME: {
    status: 'MAX_LENGTH_TRADER_USERNAME',
    message: `Not allow user to input more ${MAX_LENGTH_NAME} characters.`
  },
  INVALID_TRADER_USERNAME: {
    status: 'INVALID_TRADER_USERNAME',
    message: 'Username must not contain special characters'
  },
  EXIST_TRADER_USERNAME: {
    status: 'EXIST_TRADER_USERNAME',
    message: 'Username is already in use'
  },
  INVALID_TRADER: {
    status: 'INVALID_TRADER',
    message: 'Invalid trader name special characters is not allowed'
  },
  EMPTY_FULLNAME: {
    status: 'EMPTY_FULLNAME',
    message: 'Full name is required'
  },
  MIN_LENGTH_TRADER_FULL_NAME: {
    status: 'MIN_LENGTH_TRADER_FULL_NAME',
    message: `Please do not enter less than ${MIN_LENGTH_FULLNAME} characters.`
  },
  MAX_LENGTH_TRADER_FULL_NAME: {
    status: 'MAX_LENGTH_TRADER_FULL_NAME',
    message: `Not allow user to input more ${MAX_LENGTH_FULLNAME} characters.`
  },
  INVALID_PHONENUM: {
    status: 'INVALID_PHONENUM',
    message: 'Invalid phone number'
  },
  MIN_LENGTH_PHONENUM: {
    status: 'MIN_LENGTH_PHONENUM',
    message: 'Minimum phone number 10 and maximum 11 numbers'
  },
  MAX_LENGTH_PHONENUM: {
    status: 'MAX_LENGTH_PHONENUM',
    message: 'Minimum phone number 10 and maximum 11 numbers'
  },
  EMPTY_PHONENUM: {
    status: 'EMPTY_PHONENUM',
    message: 'Phone1 is required'
  },
  INVALID_PHONE2: {
    status: 'INVALID_PHONE2',
    message: 'Invalid phone number'
  },
  MIN_LENGTH_PHONE2: {
    status: 'MIN_LENGTH_PHONE2',
    message: 'Minimum phone number 10 and maximum 11 numbers'
  },
  MAX_LENGTH_PHONE2: {
    status: 'MAX_LENGTH_PHONE2',
    message: 'Minimum phone number 10 and maximum 11 numbers'
  },
  EMPTY_PHONE2: {
    status: 'EMPTY_PHONENUM',
    message: 'Phone1 is required'
  },
  EMPTY_CREDITPRICING: {
    status: 'EMPTY_CREDITPRICING',
    message: 'Credit price is required'
  },
  INVALID_IS_SCAMMER: {
    status: 'INVALID_IS_SCAMMER',
    message: 'isScammer is required'
  },
  INVALID_IS_SUSPECT_WITH_DRAWER: {
    status: 'INVALID_IS_SUSPECT_WITH_DRAWER',
    message: 'isSuspectWithDrawer is required'
  },
  INVALID_CREDITPRICING: {
    status: 'INVALID_CREDITPRICING',
    message: 'Enter credit pricing without accents and white spaces'
  },
  INVALID_FULLNAME: {
    status: 'INVALID_FULLNAME',
    message: 'Full name must not contain white space and special characters'
  },
  INVALID_ISLOCKED_ON_LOCKREASON: {
    status: 'INVALID_ISLOCKED_ON_LOCKREASON',
    message: 'Cannot insert lock reason while isLocked is false'
  },
  INVALID_ISSCAMMER_ON_SCAMMERNOTE: {
    status: 'INVALID_ISSCAMMER_ON_SCAMMERNOTE',
    message: 'Cannot insert scammer note while isScammer is false'
  },
  USERNAME_PRESENT: {
    status: 'USERNAME_PRESENT',
    message: 'Username is not accept for update trader'
  },
  MAX_LENGTH_LOCKREASON: {
    status: 'MAX_LENGTH_LOCKREASON',
    message: 'Not allow user to input more 9999 characters.'
  },
  MAX_LENGTH_SCAMMERNOTE: {
    status: 'MAX_LENGTH_SCAMMERNOTE',
    message: 'Not allow user to input more 9999 characters.'
  },
  MAX_LENGTH_NOTE: {
    status: 'MAX_LENGTH_NOTE',
    message: 'Not allow user to input more 9999 characters.'
  }
}
