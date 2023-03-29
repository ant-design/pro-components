import { App } from 'antd';
import { StyleProvider, ThemeProvider } from 'antd-style';
import { PropsWithChildren, useEffect } from 'react';

import { useThemeStore } from '../../store/useThemeStore';
import { getAntdTheme, getCustomStylish, getCustomToken } from '../../styles';

export default ({ children }: PropsWithChildren) => {
  const themeMode = useThemeStore((s) => s.themeMode);

  useEffect(() => {
    if (themeMode === 'dark') {
      document.body.style.setProperty('--main-bg-color', 'hsl(218,22%,7%)');
    }

    if (themeMode === 'light') {
      document.body.style.setProperty('--main-bg-color', 'hsl(220,23%,97%)');
    }
    if (themeMode === 'auto') {
      const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
      if (themeMedia.matches) {
        document.body.style.setProperty('--main-bg-color', 'hsl(220,23%,97%)');
      } else {
        document.body.style.setProperty('--main-bg-color', 'hsl(218,22%,7%)');
      }
    }
  }, [themeMode]);

  return (
    <StyleProvider prefix={'site'}>
      <ThemeProvider
        prefixCls={'site'}
        themeMode={themeMode}
        theme={getAntdTheme}
        customStylish={getCustomStylish}
        customToken={getCustomToken}
      >
        <App>{children}</App>
      </ThemeProvider>
    </StyleProvider>
  );
};
