import { GeneralResponseType } from 'src/exception/general-types';

export const SUCCESS_RESPONSE: GeneralResponseType = {
  SUCCESS_CREATE_ADMIN: {
    status: 'SUCCESS_CREATE_ADMIN',
    message: 'Account created successfully',
  },
  SUCCESS_UPDATE_ADMIN: {
    status: 'SUCCESS_UPDATE_ADMIN',
    message: 'Updated successfully',
  },
  SUCCESS_DELETE_ADMIN: {
    status: 'SUCCESS_DELETE_ADMIN',
    message: 'Account deleted successfully',
  },
  SUCCESS_CREATE_ROLE: {
    status: 'SUCCESS_CREATE_ROLE',
    message: 'Role created successfully',
  },
  SUCCESS_UPDATE_ROLE: {
    status: 'SUCCESS_UPDATE_ROLE',
    message: 'Updated successfully',
  },
  SUCCESS_DELETE_ROLE: {
    status: 'SUCCESS_DELETE_ROLE',
    message: 'Role deleted successfully',
  },
  SUCCESS_MESSAGE_SEND: {
    status: 'SUCCESS_MESSAGE_SEND',
    message: 'Successfully message sending!',
  },
  SUCCESS_SMS_LOG_CREATE: {
    status: 'SUCCESS_SMS_LOG_CREATE',
    message: 'Successfully sms log created!',
  },
  SUCCESS_SMS_LOG_UPDATE: {
    status: 'SUCCESS_SMS_LOG_UPDATE',
    message: 'Successfully sms log updated!',
  },
  SUCCESS_SMS_LOG_DELETE: {
    status: 'SUCCESS_SMS_LOG_DELETE',
    message: 'Successfully sms log deleted!',
  },
  SUCCESS_CDR_LOG_CREATE: {
    status: 'SUCCESS_CDR_LOG_CREATE',
    message: 'Successfully cdr log created!',
  },
  SUCCESS_CDR_LOG_UPDATE: {
    status: 'SUCCESS_CDR_LOG_UPDATE',
    message: 'Successfully cdr log updated!',
  },
  SUCCESS_CDR_LOG_DELETE: {
    status: 'SUCCESS_CDR_LOG_DELETE',
    message: 'Successfully cdr log deleted!',
  },
  SUCCESS_SUBSCRIBE_SDP: {
    status: 'SUCCESS_SUBSCRIBE_SDP',
    message: 'Successfully subscribe sdp!',
  },
  SUCCESS_UNSUBSCRIBE_SDP: {
    status: 'SUCCESS_UNSUBSCRIBE_SDP',
    message: 'Successfully unsubscribe sdp!',
  },
};
