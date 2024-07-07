import { GeneralResponseType } from './general-types';

export const GENERAL_RESPONSE: GeneralResponseType = {
  MISSING_HEADER: {
    status: 'MISSING_HEADER',
    message: 'Some headers are missing.',
  },
  INVALID_ACCESS_TOKEN: {
    status: 'INVALID_ACCESS_TOKEN',
    message: 'Invalid Access Token',
  },
  INVALID_REFRESH_TOKEN: {
    status: 'INVALID_REFRESH_TOKEN',
    message: 'Invalid Refresh Token',
  },
  TOKEN_EXPIRED: {
    status: 'TOKEN_EXPIRED',
    message: 'Token Expired',
  },
  DELETED_ACCOUNT: {
    status: 'DELETED_ACCOUNT',
    message: 'This account is deleted',
  },
  INVALID_LOGIN: {
    status: 'INVALID_LOGIN',
    message: 'Invalid Login.',
  },
  INVALID_TOKEN: {
    status: 'INVALID_TOKEN',
    message: 'Invalid Token.',
  },
  SESSION_LOGOUT: {
    status: 'SESSION_LOGOUT',
    message: 'This session had been logged out.',
  },
  WRONG_CREDENTIALS: {
    status: 'WRONG_CREDENTIALS',
    message: 'WRONG_CREDENTIALS',
  },
  UNAUTHORIZED: {
    status: 'UNAUTHORIZED',
    message: 'UNAUTHORIZED',
  },
  INTERNAL_SERVER_ERROR: {
    status: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
  },
  MISSING_CREDENTIALS: {
    status: 'MISSING_CREDENTIALS',
    message: 'missing credentials',
  },
  ADMIN_NOT_FOUND: {
    status: 'ADMIN_NOT_FOUND',
    message: 'Admin not found',
  },
  ID_NOT_FOUND: {
    status: 'ID_NOT_FOUND',
    message: 'ID not found',
  },
  ACCOUNT_DELETE_FORBIDDEN: {
    status: 'ACCOUNT_DELETE_FORBIDDEN',
    message: 'Cannot delete current logined account',
  },
  ROLE_NOT_FOUND: {
    status: 'ROLE_NOT_FOUND',
    message: 'Role not found',
  },
  PRODUCT_NOT_FOUND: {
    status: 'PRODUCT_NOT_FOUND',
    message: 'Product not found',
  },
  SUBSCRIBER_EXITS: {
    status: 'SUBSCRIBER_EXITS',
    message: 'Subscriber has already exits!',
  },
  SUBSCRIBER_NOT_FOUND: {
    status: 'SUBSCRIBER_NOT_FOUND',
    message: 'Subscriber not found!',
  },
};
