import {
  MAX_LENGTH_NAME,
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_NAME,
  MIN_LENGTH_PASSWORD,
  MAX_LENGTH_EMAIL,
  MIN_LENGTH_EMAIL,
} from 'src/constants/constants';
import { GeneralResponseType } from './general-types';

export const GENERAL_VALIDATOR_RESPONSE: GeneralResponseType = {
  UNEXPECTED_ERROR: {
    status: 'UNEXPECTED_ERROR',
    message: 'An unexpected error occurred. Please try again later',
  },
  EMPTY_USERNAME: {
    status: 'EMPTY_USERNAME',
    message: 'Your username is required',
  },
  MIN_LENGTH_USERNAME: {
    status: 'MIN_LENGTH_USERNAME',
    message: `Please do not enter less than ${MIN_LENGTH_NAME} characters.`,
  },
  MAX_LENGTH_USERNAME: {
    status: 'MAX_LENGTH_USERNAME',
    message: `Not allow user to input more ${MAX_LENGTH_NAME} characters.`,
  },
  INVALID_USERNAME: {
    status: 'INVALID_USERNAME',
    message:
      'Invalid username format, spaces and special characters are not allowed',
  },
  EXIST_USERNAME: {
    status: 'EXIST_USERNAME',
    message:
      'This user has been registered with the system, please check again',
  },
  EMPTY_PASSWORD: {
    status: 'EMPTY_PASSWORD',
    message: 'Password is required',
  },
  INVALID_PASSWORD: {
    status: 'INVALID_PASS',
    message: 'Password must not contain spaces',
  },
  MIN_LENGTH_PASSWORD: {
    status: 'MIN_LENGTH_PASSWORD',
    message: `Please do not enter less than ${MIN_LENGTH_PASSWORD} characters.`,
  },
  MAX_LENGTH_PASSWORD: {
    status: 'MAX_LENGTH_PASSWORD',
    message: `Not allow user to input more ${MAX_LENGTH_PASSWORD} characters.`,
  },
  PASSWORD_POLICY: {
    status: 'PASSWORD_POLICY',
    message: `Password minimum ${MIN_LENGTH_PASSWORD} characters. Include at least 1 uppercase letter, lowercase letter, number and special character.`,
  },
  INVALID_EMAIL: {
    status: 'INVALID_EMAIL',
    message: 'Invalid Email Format',
  },
  EMPTY_EMAIL: {
    status: 'EMPTY_EMAIL',
    message: 'Email is required',
  },
  MAX_LENGTH_EMAIL: {
    status: 'MAX_LENGTH_EMAIL',
    message: `Email must be between ${MIN_LENGTH_EMAIL} and ${MAX_LENGTH_EMAIL} characters.`,
  },
  EMPTY_FULLNAME: {
    status: 'EMPTY_FULLNAME',
    message: 'Full name is required',
  },

  INVALID_FULLNAME: {
    status: 'INVALID_FULLNAME',
    message: 'Full name must not contain white space and special characters',
  },
};
