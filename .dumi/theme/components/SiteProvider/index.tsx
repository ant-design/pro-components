import { App } from 'antd';
import { StyleProvider, ThemeProvider } from 'antd-style';
import { PropsWithChildren } from 'react';

import { useThemeStore } from '../../store/useThemeStore';
import { getAntdTheme, getCustomStylish, getCustomToken } from '../../styles';

export default ({ children }: PropsWithChildren) => {
  const themeMode = useThemeStore((s) => s.themeMode);

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
