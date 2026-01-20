/**
 * 测试环境公共常量
 * 在 vitest.config.mts 和测试文件中共享使用
 */

/** 测试 URL 参数 */
export const TEST_URL_PARAMS = {
  navTheme: 'realDark',
  layout: 'mix',
  colorPrimary: 'techBlue',
  splitMenus: 'false',
  fixedHeader: 'true',
} as const;

/** 测试初始 URL */
export const TEST_INITIAL_URL = `http://localhost?${new URLSearchParams(TEST_URL_PARAMS).toString()}`;
