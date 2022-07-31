import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { ConfigProvider, theme as antdTheme } from 'antd';
import type { AliasToken } from 'antd/es/theme';
import type React from 'react';
import { useContext } from 'react';

const { useToken } = antdTheme;

export type UseStyleResult = {
  wrapSSR: (node: React.ReactElement) => React.ReactElement;
  hashId: string;
};

export type ProAliasToken = AliasToken & {
  proComponentsCls: string;
  antCls: string;
};

export function useStyle(
  componentName: string,
  styleFn: (token: ProAliasToken) => CSSInterpolation,
): UseStyleResult {
  const { token, hashId, theme } = useToken();
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const proComponentsCls = `.${getPrefixCls()}-pro`;
  return {
    wrapSSR: useStyleRegister({ theme, token, hashId, path: [componentName] }, () =>
      styleFn({
        ...token,
        antCls: '.' + getPrefixCls(),
        proComponentsCls,
      }),
    ),
    hashId,
  };
}
