import { theme } from 'antd';
import { useMemo } from 'react';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = () => {
  const { token } = theme.useToken();
  const { isDarkMode } = useThemeMode();
  const className = useMemo(() => 'dumi-code-snippet', []);

  return {
    styles: className,
    theme: { colorSuccess: token.colorSuccess, appearance: isDarkMode ? 'dark' : 'light' },
  };
};
