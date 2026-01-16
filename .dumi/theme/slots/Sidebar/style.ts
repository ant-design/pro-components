import { useMemo } from 'react';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = () => {
  const { isDarkMode } = useThemeMode();

  const classNames = useMemo(
    () => ({
      sidebar: 'dumi-sidebar',
    }),
    [],
  );

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
