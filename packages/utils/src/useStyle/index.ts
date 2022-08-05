import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { ConfigProvider, theme as antdTheme } from 'antd';
import type { AliasToken } from 'antd/es/theme';
import type React from 'react';
import { useContext } from 'react';
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

/**
 * 如果 antd 里面没有，就用我 mock 的，这样 antd@4 和 antd@5 可以兼容
 */
const { useToken } = { ...batToken, ...antdTheme };

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
};

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
        antCls: '.' + getPrefixCls(),
        proComponentsCls,
      }),
    ),
    hashId,
  };
}
