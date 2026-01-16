import { useMemo } from 'react';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyle = () => {
  const { isDarkMode } = useThemeMode();

  const classNames = useMemo(
    () => ({
      header: 'dumi-header',
      content: 'dumi-header-content',
      left: 'dumi-header-left',
      right: 'dumi-header-right',
    }),
    [],
  );

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
