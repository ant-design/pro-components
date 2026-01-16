import { useMemo } from 'react';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = () => {
  const { isDarkMode } = useThemeMode();

  const classNames = useMemo(
    () => ({
      container: 'dumi-search-bar-container',
      shortcut: 'site-header-shortcut dumi-search-bar-shortcut',
      popover: 'dumi-search-bar-popover',
      svg: 'dumi-search-bar-svg',
      input: 'dumi-search-bar-input',
    }),
    [],
  );

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
