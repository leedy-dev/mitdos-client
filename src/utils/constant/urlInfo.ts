import CONSTANTS from './constants';

const URL_INFO = {
  // PAGE URL 정의

  LOGIN_MAIN: { URL: '/login', NAME: '로그인' },
  DASH_BOARD_MAIN: { URL: '/dashboard', NAME: 'Dashboard' },

  SAMPLE_SEARCH_001: { URL: '/Sample/SmplSrch001', NAME: 'Search 001' },
  SAMPLE_CRUD_001: { URL: '/Sample/SmplCrud001', NAME: 'CRUD 001' },
  SAMPLE_GRID_001: { URL: '/Sample/SmplGrid001', NAME: 'Grid 001' },
  SAMPLE_GRID_002: { URL: '/Sample/SmplGrid002', NAME: 'Grid 002' },
  SAMPLE_LANGUAGE_001: { URL: '/Sample/SmplLang001', NAME: 'Language 001' },
  SAMPLE_TREE_001: { URL: '/Sample/SmplTree001', NAME: 'Tree 001' },
  SAMPLE_DIAL_001: { URL: '/Sample/SmplDial001', NAME: 'Dialog 001' },
  SAMPLE_MSSG_001: { URL: '/Sample/SmplMssg001', NAME: 'Message 001' },
  SAMPLE_CODE_001: { URL: '/Sample/SmplCode001', NAME: 'Code 001' },
  SAMPLE_USER_001: { URL: '/Sample/SmplUser001', NAME: 'User 001' },
  SAMPLE_TMPL_001: { URL: '/Sample/Template001', NAME: 'Template 001' },
  SAMPLE_TMPL_002: {
    URL: '/Sample/Template002',
    NAME: 'Template 002',
  },
  SAMPLE_TMPL_003: {
    URL: '/Sample/Template003',
    NAME: 'Template 003',
  },
  SAMPLE_USER_002: { URL: '/Sample/SmplUser002', NAME: 'User 002' },
  SAMPLE_BOARD_001: { URL: '/Sample/SmplBoard001', NAME: 'Board 001' },
  EDIT_BOARD_PAGE: { URL: '/Sample/EditBoardPage', NAME: 'Edit Board' },

  // API URL 정의
  API_V1: {
    // 로그인
    SIGN_IN_URL: '/auth/sign-in',
    // 로그아웃
    SIGN_OUT_URL: '/auth/sign-out',
    // 토큰 재발급
    REISSUE_URL: '/auth/reissue',

    // 메뉴 조회
    MENU_URL: '/menu',

    //다국어샘플
    SAMPLE_LANGUAGE: CONSTANTS.API_V1_BASE_URL + '/api/sample/language',
    //메뉴트리
    SAMPLE_TREE: CONSTANTS.API_V1_BASE_URL + '/api/sample/menu',
    //사용자
    SAMPLE_USERS: CONSTANTS.API_V1_BASE_URL + '/api/sample/users',
    // CRUD 샘플
    SAMPLE_CRUD: CONSTANTS.API_V1_BASE_URL + '/api/sample/sample',
    // mesage 샘플
    SAMPLE_MESSAGE: CONSTANTS.API_V1_BASE_URL + '/api/sample/commonMessage',
    // CODE 샘플
    SAMPLE_CODE: CONSTANTS.API_V1_BASE_URL + '/api/sample/commonCode',
    // BOARD 샘플
    SAMPLE_BOARD: CONSTANTS.API_V1_BASE_URL + '/api/sample/board',
    // EDITOR 이미지
    EDITOR_IMAGE: CONSTANTS.API_V1_BASE_URL + '/api/sample/editorimage',
  },

  API_V2: {
    LOGIN_URL: '/api/login',
    LOGOUT_URL: '/api/login',
  },
};

export default URL_INFO;
