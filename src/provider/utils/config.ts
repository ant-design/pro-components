import type { ThemeConfig } from 'antd';
import { theme as antdTheme } from 'antd';
import type { IntlType } from '../intl';
import { findIntlKeyByAntdLocaleKey, intlMap, zhCNIntl } from '../intl';

type WithoutUndefined<T> = Partial<{
  [P in keyof T]: Exclude<T[P], undefined>;
}>;

export function omitUndefined<T extends Record<string, any>>(
  obj: T,
): WithoutUndefined<T> | undefined {
  const result = Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined),
  );
  return Object.keys(result).length ? (result as WithoutUndefined<T>) : undefined;
}

export function isNeedOpenHash(): boolean {
  if (typeof process === 'undefined') return true;
  const env = process.env.NODE_ENV?.toLowerCase();
  return env !== 'test' && env !== 'development';
}

export function resolveProConfigHashed(
  propsHashed: boolean | undefined,
  inheritedProHashed: boolean | undefined,
  parentHashId: string | undefined,
  needOpenHash = isNeedOpenHash(),
): boolean {
  return (
    propsHashed !== false &&
    inheritedProHashed !== false &&
    parentHashId !== '' &&
    needOpenHash
  );
}

export function resolveIntl(
  propsIntl: IntlType | undefined,
  parentIntl: IntlType | undefined,
  antdLocaleName: string | undefined,
): IntlType {
  if (propsIntl) return propsIntl;
  if (parentIntl && parentIntl.locale !== 'default') return parentIntl;
  const key = antdLocaleName && findIntlKeyByAntdLocaleKey(antdLocaleName);
  return (key && intlMap[key as keyof typeof intlMap]) || zhCNIntl;
}

export function resolveThemeAlgorithm(
  parentAlgorithm: ThemeConfig['algorithm'],
  dark: boolean | undefined,
  inheritedDark: boolean | undefined,
): ThemeConfig['algorithm'] {
  if (dark ?? inheritedDark) {
    return [parentAlgorithm, antdTheme.darkAlgorithm]
      .flat()
      .filter(Boolean) as ThemeConfig['algorithm'];
  }
  if (dark === false) {
    return parentAlgorithm ?? antdTheme.defaultAlgorithm;
  }
  return parentAlgorithm;
}
