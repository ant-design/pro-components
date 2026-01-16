import { useMemo } from 'react';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = (prefixCls: string = 'ant') => {
  const { isDarkMode } = useThemeMode();
  const prefix = `${prefixCls}-highlighter`;

  const classNames = useMemo(
    () => ({
      shiki: `${prefix}-shiki dumi-highlighter-shiki`,
      prism: `${prefix}-prism dumi-highlighter-prism`,
      loading: 'dumi-highlighter-loading',
    }),
    [prefix],
  );

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
