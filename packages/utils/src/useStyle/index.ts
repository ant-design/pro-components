import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
// @ts-ignore
import { ConfigProvider, theme as antdTheme } from 'antd';
import type React from 'react';
import { useContext } from 'react';
import type { AliasToken } from './token';
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
  ComponentToken extends object = AliasToken,
  ReturnType = CSSInterpolation,
> = (token: ComponentToken) => ReturnType;
/**
 * 如果 antd 里面没有，就用我 mock 的，这样 antd@4 和 antd@5 可以兼容
 */
const { useToken } = { ...batToken, ...antdTheme } as unknown as typeof batToken;

export { useToken };

export type UseStyleResult = {
  wrapSSR: (node: React.ReactElement) => React.ReactElement;
  hashId: string;
};

export type ProAliasToken = AliasToken & {
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
  hashId?: string;
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
 * @returns {UseStyleResult}
 */
export function useStyle(
  componentName: string,
  styleFn: (token: ProAliasToken) => CSSInterpolation,
): UseStyleResult {
  const { token, hashId, theme } = useToken();
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  /**
   * pro 的 类
   * @type {string}
   * @example .ant-pro
   */
  const proComponentsCls = `.${getPrefixCls()}-pro`;
  return {
    wrapSSR: useStyleRegister({ theme, token, hashId, path: [componentName] }, () =>
      styleFn({
        ...token,
        hashId,
        antCls: '.' + getPrefixCls(),
        proComponentsCls: hashId + proComponentsCls,
      }),
    ),
    hashId,
  };
}
