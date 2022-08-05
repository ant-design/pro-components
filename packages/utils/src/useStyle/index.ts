import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { ConfigProvider, theme as antdTheme } from 'antd';
import type { AliasToken } from 'antd/es/theme';
import type React from 'react';
import { useContext } from 'react';
import * as batToken from './token';

export const setAlpha = (baseColor: string, alpha: number) =>
  new TinyColor(baseColor).setAlpha(alpha).toRgbString();

export const lighten = (baseColor: string, brightness: number) => {
  const instance = new TinyColor(baseColor);
  return instance.lighten(brightness).toHexString();
};

const { useToken } = { ...batToken, ...antdTheme };

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
