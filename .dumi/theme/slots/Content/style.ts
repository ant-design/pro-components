import { useMemo } from 'react';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = () => {
  const { isDarkMode } = useThemeMode();

  const classNames = useMemo(
    () => ({
      content: 'dumi-content',
    }),
    [],
  );

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
