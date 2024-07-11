import {
  BadRequestException,
  ForbiddenException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'

export const GENERAL_RESPONSE = {
  ROLE_NOT_FOUND: {
    status: 'ROLE_NOT_FOUND',
    message: 'Role not found'
  },
  MISSING_HEADER: {
    status: 'MISSING_HEADER',
    message: 'Some headers are missing.'
  },
  INVALID_ACCESS_TOKEN: {
    status: 'INVALID_ACCESS_TOKEN',
    message: 'Invalid Access Token'
  },
  INVALID_REFRESH_TOKEN: {
    status: 'INVALID_REFRESH_TOKEN',
    message: 'Invalid Refresh Token'
  },
  TOKEN_EXPIRED: {
    status: 'TOKEN_EXPIRED',
    message: 'Token Expired'
  },
  INACTIVE_ADMIN_USER: {
    status: 'INACTIVE_ADMIN_USER',
    message: 'Your account is currently inactive.'
  },
  DELETED_ACCOUNT: {
    status: 'DELETED_ACCOUNT',
    message: 'This account is deleted'
  },
  FAILED_LOGIN: {
    status: 'FAILED_LOGIN',
    message: 'Wrong creditentials'
  },
  INVALID_TOKEN: {
    status: 'INVALID_TOKEN',
    message: 'Invalid Token.'
  },
  SESSION_LOGOUT: {
    status: 'SESSION_LOGOUT',
    message: 'This session had been logged out.'
  },
  WRONG_CREDENTIALS: {
    status: 'WRONG_CREDENTIALS',
    message: 'WRONG_CREDENTIALS'
  },
  UNAUTHORIZED: {
    status: 'UNAUTHORIZED',
    message: 'UNAUTHORIZED'
  },
  INTERNAL_SERVER_ERROR: {
    status: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error'
  },
  MISSING_CREDENTIALS: {
    status: 'MISSING_CREDENTIALS',
    message: 'missing credentials'
  },
  ADMIN_NOT_FOUND: {
    status: 'ADMIN_NOT_FOUND',
    message: 'Admin account not found'
  },
  TRADER_NOT_FOUND: {
    status: 'TRADER_NOT_FOUND',
    message: 'Trader account not found'
  },
  ID_NOT_FOUND: {
    status: 'ID_NOT_FOUND',
    message: 'ID not found'
  },
  ACCOUNT_DELETE_FORBIDDEN: {
    status: 'ACCOUNT_DELETE_FORBIDDEN',
    message: 'Cannot delete current logined account'
  },
  FAILED_CREATE_ADMIN: {
    status: 'FAILED_CREATE_ADMIN',
    message: 'Account create failed'
  },
  CANNOT_DELETE_LAST_ADMIN: {
    status: 'CANNOT_DELETE_LAST_ADMIN',
    message: 'Cannot delete the last admin account'
  },
  EXIST_ADMIN_USERNAME: {
    status: 'EXIST_ADMIN_USERNAME',
    message: 'Username is already in use'
  },
  FAILED_UPDATE_ADMIN: {
    status: 'FAILED_UPDATE_ADMIN',
    message: 'Update failed'
  },
  FAILED_CREATE_TRADER: {
    status: 'FAILED_CREATE_TRADER',
    message: 'Account create failed'
  },
  FAILED_UPDATE_TRADER: {
    status: 'FAILED_UPDATE_TRADER',
    message: 'Update failed'
  },
  INVALID_FULLNAME: {
    status: 'INVALID_FULLNAME',
    message: 'Full name must not contain white space and special characters'
  },
  INVALID_DOB_DATE: {
    status: 'INVALID_DOB_DATE',
    message: 'Invalid Date Format'
  }
}

export class FailedUpdateAdminException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.FAILED_UPDATE_ADMIN)
  }
}

export class ExistAdminUsernameException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.EXIST_ADMIN_USERNAME)
  }
}

export class RoleNotFoundException extends NotFoundException {
  constructor() {
    super(GENERAL_RESPONSE.ROLE_NOT_FOUND)
  }
}

export class FailedDeleteLastAdminException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.CANNOT_DELETE_LAST_ADMIN)
  }
}

export class FailedCreateAdminException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.FAILED_CREATE_ADMIN)
  }
}

export class InactiveAdminUserException extends ForbiddenException {
  constructor() {
    super(GENERAL_RESPONSE.INACTIVE_ADMIN_USER)
  }
}

export class FailedLoginException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.FAILED_LOGIN);
  }
}

export class InvalidAccessTokenException extends UnauthorizedException {
  constructor() {
    super(GENERAL_RESPONSE.INVALID_ACCESS_TOKEN)
  }
}

export class InvalidRefreshTokenException extends UnauthorizedException {
  constructor() {
    super(GENERAL_RESPONSE.INVALID_REFRESH_TOKEN)
  }
}

export class TokenExpireException extends NotAcceptableException {
  constructor() {
    super(GENERAL_RESPONSE.TOKEN_EXPIRED)
  }
}

export class AccountDeleteForbiddenException extends ForbiddenException {
  constructor() {
    super(GENERAL_RESPONSE.ACCOUNT_DELETE_FORBIDDEN)
  }
}

export class IdNotFoundException extends NotFoundException {
  constructor() {
    super(GENERAL_RESPONSE.ID_NOT_FOUND)
  }
}

export class AdminNotFoundException extends NotFoundException {
  constructor() {
    super(GENERAL_RESPONSE.ADMIN_NOT_FOUND)
  }
}

export class TraderNotFoundException extends NotFoundException {
  constructor() {
    super(GENERAL_RESPONSE.TRADER_NOT_FOUND)
  }
}

export class FailCreateTraderException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.FAILED_CREATE_TRADER)
  }
}

export class FailUpdateTraderException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.FAILED_UPDATE_TRADER)
  }
}

export class InvalidFullnameException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.INVALID_FULLNAME)
  }
}
export class InvalidDateFormatException extends BadRequestException {
  constructor() {
    super(GENERAL_RESPONSE.INVALID_DOB_DATE)
  }
}
