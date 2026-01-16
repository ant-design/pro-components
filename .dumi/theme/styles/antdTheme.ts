import type { ThemeConfig } from 'antd';
import { darkAlgorithm, lightAlgorithm } from './algorithms';

export const getAntdTheme = (appearance: 'light' | 'dark'): ThemeConfig => {
  const themeConfig: ThemeConfig = {
    token: {
      colorTextBase: '#3d3e40',
    },
    algorithm: lightAlgorithm,
  };

  if (appearance === 'dark') {
    themeConfig.token = {
      colorTextBase: '#c7ddff',
    };

    themeConfig.algorithm = darkAlgorithm;
  }

  return themeConfig;
};
