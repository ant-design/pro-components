import { useMemo } from 'react';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = () => {
  const { isDarkMode } = useThemeMode();

  const classNames = useMemo(
    () => ({
      layout: 'dumi-docs-layout',
      toc: 'dumi-docs-toc',
      content: 'dumi-docs-content',
    }),
    [],
  );

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
