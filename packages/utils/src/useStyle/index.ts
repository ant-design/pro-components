import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { theme as antdTheme } from 'antd';
import type { AliasToken } from 'antd/es/theme';
import type React from 'react';

const { useToken } = antdTheme;

export type UseStyleResult = {
  wrapSSR: (node: React.ReactElement) => React.ReactElement;
  hashId: string;
};

export type ProAliasToken = AliasToken & {
  proComponentsCls: string;
};

export function useStyle(
  componentName: string,
  styleFn: (token: ProAliasToken) => CSSInterpolation,
): UseStyleResult {
  const { token, hashId, theme } = useToken();
  const proComponentsCls = '.ant-pro';
  return {
    wrapSSR: useStyleRegister({ theme, token, hashId, path: [componentName] }, () => {
      return {
        [proComponentsCls]: styleFn({ ...token, proComponentsCls: '.ant-pro' }),
      };
    }),
    hashId,
  };
}
