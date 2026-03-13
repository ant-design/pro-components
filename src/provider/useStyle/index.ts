import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { ConfigProvider as AntdConfigProvider, theme as antdTheme } from 'antd';
import type { GlobalToken } from 'antd/lib/theme/interface';
import type React from 'react';
import { useContext, useMemo, useRef } from 'react';
import { ProProvider } from '../index';
import type { ProTokenType } from '../typing/layoutToken';

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

// 为了兼容 antd 类型，这里使用 any
export const proTheme = antdTheme as any;

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
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
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

const hashString = (input: string): string => {
  let hash = 5381;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
};

const getProTokenKey = (token: ProAliasToken): string => {
  try {
    // ProProvider exposes finalToken instead of useCacheToken token,
    // so build a stable key from Pro token payload directly.
    return hashString(JSON.stringify(token));
  } catch {
    return '';
  }
};

/**
 * 封装了一下 antd 的 useStyle
 * @param componentName {string} 组件的名字
 * @param styleFn {GenerateStyle} 生成样式的函数
 * @returns UseStyleResult
 */
export function useStyle(
  componentName: string,
  styleFn: (token: ProAliasToken) => CSSInterpolation,
) {
  let { token = {} as Record<string, any> as ProAliasToken, hashed } =
    useContext(ProProvider);

  const { token: antdToken, hashId, theme } = antdTheme.useToken();

  const { getPrefixCls, csp } = useContext(AntdConfigProvider.ConfigContext);

  // 如果不在 ProProvider 里面，就用 antd 的
  if (!token.layout) {
    token = { ...antdToken } as any;
  }

  token.proComponentsCls = token.proComponentsCls ?? `.${getPrefixCls('pro')}`;

  token.antCls = `.${getPrefixCls()}`;

  // Register styles (side effect only in v2)
  // Keep path sensitive to both antd theme and Pro token updates.
  const proTokenKey = useMemo(() => {
    return getProTokenKey(token as ProAliasToken);
  }, [token]);

  // Keep path monotonic across toggles to avoid style order issues
  // when switching dark -> light (back to an old key).
  const styleKey = [
    hashId,
    (theme as any).id,
    token.themeId,
    proTokenKey,
  ]
    .filter(Boolean)
    .join('-');

  const lastStyleKeyRef = useRef<string>('');
  const styleVersionRef = useRef(0);
  if (lastStyleKeyRef.current !== styleKey) {
    styleVersionRef.current += 1;
    lastStyleKeyRef.current = styleKey;
  }

  const stylePath = [componentName, styleKey, styleVersionRef.current].filter(
    Boolean,
  );

  useStyleRegister(
    {
      theme: theme as any,
      token,
      path: stylePath,
      nonce: csp?.nonce,
      layer: {
        name: 'antd-pro',
      },
    } as any,
    () => styleFn(token as ProAliasToken),
  );

  return {
    wrapSSR: (node: React.ReactElement) => node,
    hashId: hashed ? hashId : '',
  };
}
