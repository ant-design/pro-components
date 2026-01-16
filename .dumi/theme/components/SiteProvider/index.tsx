import { App, ConfigProvider } from 'antd';
import { PropsWithChildren, useMemo, useEffect, useState } from 'react';

import { useThemeStore } from '../../store/useThemeStore';
import { getAntdTheme } from '../../styles';
import '../../index.css';

export default ({ children }: PropsWithChildren) => {
  const themeMode = useThemeStore((s) => s.themeMode);
  const [actualThemeMode, setActualThemeMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const updateTheme = () => {
        setActualThemeMode(mediaQuery.matches ? 'dark' : 'light');
      };
      updateTheme();
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    } else {
      setActualThemeMode(themeMode);
    }
  }, [themeMode]);

  const themeConfig = useMemo(() => getAntdTheme(actualThemeMode), [actualThemeMode]);

  return (
    <ConfigProvider theme={themeConfig} prefixCls="site">
      <App>{children}</App>
    </ConfigProvider>
  );
};
