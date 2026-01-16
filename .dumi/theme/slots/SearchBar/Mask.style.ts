import { useMemo } from 'react';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = () => {
  const { isDarkMode } = useThemeMode();

  const classNames = useMemo(
    () => ({
      modal: 'dumi-search-bar-mask-modal',
      mask: 'dumi-search-bar-mask',
      content: 'dumi-search-bar-mask-content',
    }),
    [],
  );

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
