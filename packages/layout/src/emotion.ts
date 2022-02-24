import createEmotion from '@emotion/css/create-instance';

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache,
} = createEmotion({
  // The key option is required when there will be multiple instances in a single app
  key: 'ant-design-pro-layout',
  container: document.body || undefined,
});
