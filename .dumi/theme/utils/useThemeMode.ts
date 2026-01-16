import { useThemeStore } from '../store/useThemeStore';
import { useEffect, useState } from 'react';

export const useThemeMode = () => {
  const themeMode = useThemeStore((s) => s.themeMode);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      if (themeMode === 'auto') {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      } else {
        setIsDarkMode(themeMode === 'dark');
      }
    };

    updateTheme();

    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [themeMode]);

  return { isDarkMode, themeMode };
};
