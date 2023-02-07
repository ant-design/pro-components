import { GetAntdTheme, ThemeConfig } from 'antd-style';
import { darkAlgorithm, lightAlgorithm } from './algorithms';

export const getAntdTheme: GetAntdTheme = (appearance) => {
  const theme: ThemeConfig = {
    token: {
      colorTextBase: '#3d3e40',
    },
    algorithm: lightAlgorithm,
  };

  if (appearance === 'dark') {
    theme.token = {
      colorTextBase: '#c7ddff',
    };

    theme.algorithm = darkAlgorithm;
  }

  return theme;
};
