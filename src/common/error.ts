export const Err = {
  USER: {
    NOT_FOUND: {
      code: 400,
      message: '존재하지 않는 사용자입니다.',
    },
    EXISTING_USER: {
      code: 400,
      message: '이미 존재하는 사용자입니다.',
    },
  },
  TOKEN: {
    INVALID_TOKEN: {
      code: 401,
      message: '유효하지 않은 토큰입니다.',
    },
    JWT_EXPIRED: {
      code: 401,
      message: '토큰이 만료되었습니다.',
    },
    NO_PERMISSION: {
      code: 403,
      message: '해당 요청의 권한이 없습니다',
    },
    NOT_SEND_TOKEN: {
      code: 401,
      message: '토큰이 전송되지 않았습니다.',
    },
  },
  SERVER: {
    UNEXPECTED_ERROR: {
      code: 500,
      message: '예기치 못한 못한 서버에러가 발생했습니다.',
    },
  },
};
