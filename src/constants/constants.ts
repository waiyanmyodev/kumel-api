export const JWT_ACCESS_SECRET_KEY = "JWT_ACCESS_SECRET";
export const JWT_ACCESS_SECRET = "dMrw2S1QV3zl0cGxSg7c1aSWkeLOzYzmpMrPZgUT";
export const JWT_EXP_KEY = "JWT_EXP";
export const JWT_EXP = "60m";
export const REFRESH_EXP_IN_DAY_KEY = "REFRESH_EXP_IN_DAY";

export const DEFAULT_SALT_ROUNDS = 10;

export const ONE = 1;
export const MILLISECONDS_PER_SECOND = 1000;

export const BAD_REQUEST_VALUE = "Bad Request";

export const FIRST_PAGE = 1;
export const DEFAULT_TOTAL_PAGE = 1;
export const DEFAULT_PAGINATION_LIMIT = 10;

export const EMPTY_STRING = "";
export const NULL_VALUE = null;

export const NUM_ONLY_REGEXP = /^\d+$/i;
export const DD_MM_YYYY_REGEXP =
  /^(0[1-9]|[1-2]\d|3[0-1])-(?:0[1-9]|1[0-2])-\d{4}$/;
export const VIET_PHONE_NO_REGEXP = /^0\d*$|^$/;
export const NO_SPECIAL_CHAR_REGEXP = /^[a-zA-Z\d ]*$/;
export const EMAIL_FORMAT_REGEXP =
  /^[a-zA-Z\d._-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
export const SPACE_ONLY_REGEXP = /^ *$/;
export const CONSECUTIVE_SPACE_CHECK_REGEXP = /^(?!.* {2})/;
export const REMOVE_SCRIPT_TAB_REGEXP =
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
export const DOB_FORMAT_REGEXP =
  /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-(19\d{2}|20\d{2})$/;
export const STRONG_PASSWORD_POLICY_REGEXP =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+={}[\]:;<>,.?~\\/-]{6,}$/;
export const DOB_FORMAT = "dd-MM-yyyy";
export const DOB_FORMAT_ERROR_MSG = "dob must be formatted as dd-mm-yyyy";
export const TRADER_ALREADY_EXISTS = "Trader name already exists";

export const MAX_LENGTH_NAME = Number(process.env.MAX_LENGTH_NAME) || 32;
export const MIN_LENGTH_NAME = Number(process.env.MIN_LENGTH_NAME) || 6;
export const MAX_LENGTH_PASSWORD = 32;
export const MIN_LENGTH_PASSWORD = 6;
export const MAX_LENGTH_FULLNAME = 32;
export const MIN_LENGTH_FULLNAME = 3;
export const MIN_LENGTH_EMAIL = 4;
export const MAX_LENGTH_EMAIL = 50;

export const LOCALE = "en-US";

export const VALID_BOOLEAN_STRINGS: string[] = ["true", "false"];
