import { useMemo } from 'react';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = (prefixCls: string) => {
  const { isDarkMode } = useThemeMode();

  const classNames = useMemo(
    () => ({
      container: `${prefixCls} dumi-native-select-container`,
      button: `${prefixCls}-button dumi-native-select-button`,
    }),
    [prefixCls],
  );

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
