import { useMemo } from 'react';
import { useThemeMode } from '../../utils/useThemeMode';

export const useStyles = (prefixCls: string = 'ant') => {
  const { isDarkMode } = useThemeMode();
  const prefix = `${prefixCls}-highlighter`;
  const buttonHoverCls = `${prefix}-hover-btn`;

  const classNames = useMemo(
    () => ({
      container: `${prefix} dumi-highlighter-container`,
      withBackground: `${prefix}-background dumi-highlighter-with-background`,
      button: `${buttonHoverCls} dumi-highlighter-button`,
    }),
    [prefix, buttonHoverCls],
  );

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
