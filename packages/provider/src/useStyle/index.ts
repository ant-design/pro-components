import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';

import { ConfigProvider as AntdConfigProvider, theme } from 'antd';
import type { GlobalToken } from 'antd/lib/theme/interface';
import type React from 'react';
import { useContext } from 'react';
import { ProProvider } from '../index';
import type { ProTokenType } from '../typing/layoutToken';
import * as batToken from './token';

/**
 * 把一个颜色设置一下透明度
 * @example (#fff, 0.5) => rgba(255, 255, 255, 0.5)
 * @param baseColor {string}
 * @param alpha {0-1}
 * @returns rgba {string}
 */
export const setAlpha = (baseColor: string, alpha: number) =>
  new TinyColor(baseColor).setAlpha(alpha).toRgbString();

/**
 * 把一个颜色修改一些明度
 * @example (#000, 50) => #808080
 * @param baseColor {string}
 * @param brightness {0-100}
 * @returns hexColor {string}
 */
export const lighten = (baseColor: string, brightness: number) => {
  const instance = new TinyColor(baseColor);
  return instance.lighten(brightness).toHexString();
};

export type GenerateStyle<
  ComponentToken extends object = GlobalToken,
  ReturnType = CSSInterpolation,
> = (token: ComponentToken, ...rest: any[]) => ReturnType;

const genTheme = (): any => {
  if (typeof theme === 'undefined' || !theme) return batToken as any;
  return theme;
};

export const proTheme = genTheme() as typeof theme;

export const useToken = proTheme.useToken;

export type UseStyleResult = {
  wrapSSR: (node: React.ReactElement) => React.ReactElement;
  hashId: string;
};

export type ProAliasToken = GlobalToken &
  ProTokenType & {
    themeId: number;
    /**
     * pro 的 className
     * @type {string}
     * @example .ant-pro
     */
    proComponentsCls: string;
    /**
     * antd 的 className
     * @type {string}
     * @example .ant
     */
    antCls: string;
  };

export const resetComponent = (token: ProAliasToken): CSSObject => ({
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  color: token.colorText,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  listStyle: 'none',
});

export const operationUnit = (token: ProAliasToken): CSSObject => ({
  // FIXME: This use link but is a operation unit. Seems should be a colorPrimary.
  // And Typography use this to generate link style which should not do this.
  color: token.colorLink,
  outline: 'none',
  cursor: 'pointer',
  transition: `color ${token.motionDurationSlow}`,

  '&:focus, &:hover': {
    color: token.colorLinkHover,
  },

  '&:active': {
    color: token.colorLinkActive,
  },
});

/**
 * 封装了一下 antd 的 useStyle，支持了一下antd@4
 * @param componentName {string} 组件的名字
 * @param styleFn {GenerateStyle} 生成样式的函数
 * @returns UseStyleResult
 */
export function useStyle(
  componentName: string,
  styleFn: (token: ProAliasToken) => CSSInterpolation,
) {
  let { token = {} as ProAliasToken } = useContext(ProProvider);
  const { hashId = '', theme: provideTheme } = useContext(ProProvider);
  const { token: antdToken } = useToken();
  const { getPrefixCls } = useContext(AntdConfigProvider.ConfigContext);

  // 如果不在 ProProvider 里面，就用 antd 的
  if (!token.layout) {
    token = { ...antdToken } as any;
  }
  token.proComponentsCls = token.proComponentsCls ?? `.${getPrefixCls('pro')}`;
  token.antCls = `.${getPrefixCls()}`;

  return {
    wrapSSR: useStyleRegister(
      {
        theme: provideTheme!,
        token,
        hashId,
        path: [componentName],
      },
      () => styleFn(token as ProAliasToken),
    ),
    hashId,
  };
}
