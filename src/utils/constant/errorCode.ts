const ERROR_CODE = {
  BAD_REQUEST: {
    code: 400,
    message: '잘못된 요청입니다.',
  },
  UNAUTHORIZED: {
    code: 401,
    message: '통신에 문제가 발생하였습니다. 관리자에게 문의해 주세요(401)',
  },
  FORBIDDEN: {
    code: 403,
    message: '권한이 없어 요청이 거절되었습니다. 로그인이 필요합니다.(403)',
  },
  NOT_FOUND: {
    code: 404,
    message: '리소스를 찾을 수 없습니다.',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message:
      '서버와의 통신에 문제가 발생하였습니다. \n잠시후 다시 시도해 주세요. ',
  },
  AXIOS_CANCEL_ERROR: {
    code: 1000,
    message: 'AXIOS 취소 처리 되었습니다.',
  },
  CONNECTION_REFUSED_ERROR: {
    code: 1001,
    message: '서버와 연결 할수 없습니다.',
  },
  UNKNOWN_ERROR: {
    code: 99999,
    message: '알수 없는 에러가 발생했습니다. 잠시후 다시 시도해 주세요.',
  },
};

export default ERROR_CODE;
