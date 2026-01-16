import { theme } from 'antd';
import { useThemeMode } from './useThemeMode';

export const useTheme = () => {
  const { token } = theme.useToken();
  const { isDarkMode } = useThemeMode();

  return {
    isDarkMode,
    token,
    lineHeight: token.lineHeight,
  };
};
