import type { Theme } from '@ant-design/cssinjs';
import { useCacheToken } from '@ant-design/cssinjs';
import { ConfigProvider as AntdConfigProvider, theme as antdTheme } from 'antd';
import zh_CN from 'antd/locale/zh_CN';
// dayjs 的中文 locale 在这里按需预注入。
// 注意：ProProvider 支持 34 种语言，但 dayjs 不会自动引入对应 locale 包；
// 若业务需要切换到其他语言的 dayjs 行为，需要消费方在应用入口自行 `import 'dayjs/locale/xx'`，
// 否则运行时 `dayjs.locale(...)` 会静默回退到 en。
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import React, { useContext, useEffect, useMemo } from 'react';
import { SWRConfig, useSWRConfig } from 'swr';
import { ProConfigContext } from './context';
import type { IntlType } from './intl';
import type { ProAliasToken } from './typing/aliasToken';
import type { ProRenderFieldPropsType } from './typing/config';
import type { DeepPartial, ProTokenType } from './typing/layoutToken';
import { getLayoutDesignToken } from './typing/layoutToken';
import {
  omitUndefined,
  resolveIntl,
  resolveProConfigHashed,
  resolveThemeAlgorithm,
} from './utils/config';
import { shallowMergeOneLevel } from './utils/merge';

export type { ProSchemaValueEnumType } from '../utils/valueEnumType';
export * from './intl';
export { useIntl } from './useIntl';
export * from './useStyle';

export { DeepPartial, ProTokenType };

export { isNeedOpenHash, resolveProConfigHashed } from './utils/config';

export type {
  BaseProFieldFC,
  ConfigContextPropsType,
  ParamsType,
  ProFieldFCMode,
  ProFieldFCRenderProps,
  ProRenderFieldPropsType,
} from './typing/config';

export const { Consumer: ConfigConsumer } = ProConfigContext;

/**
 * 组件解除挂载后清空一下 cache
 * @date 2022-11-28
 * @returns null
 */
const CacheClean = () => {
  const { cache } = useSWRConfig();

  useEffect(() => {
    return () => {
      if ('clear' in cache && typeof cache.clear === 'function') {
        cache.clear();
      }
    };
  }, []);
  return null;
};

type ProConfigProviderProps = {
  children: React.ReactNode;
  autoClearCache?: boolean;
  token?: DeepPartial<ProAliasToken>;
  needDeps?: boolean;
  valueTypeMap?: Record<string, ProRenderFieldPropsType>;
  hashed?: boolean;
  dark?: boolean;
  prefixCls?: string;
  intl?: IntlType;
};

const ConfigProviderContainer: React.FC<ProConfigProviderProps> = (props) => {
  const {
    children,
    dark,
    valueTypeMap,
    autoClearCache = false,
    token: propsToken,
    prefixCls,
    intl,
  } = props;
  const { locale, getPrefixCls, ...restConfig } = useContext(
    AntdConfigProvider.ConfigContext,
  );
  const tokenContext = antdTheme.useToken?.();
  const proProvide = useContext(ProConfigContext);
  const resolvedPrefixCls =
    prefixCls ??
    (proProvide.hashId !== undefined ? proProvide.prefixCls : undefined);

  const proComponentsCls: string = resolvedPrefixCls
    ? `.${resolvedPrefixCls}`
    : `.${getPrefixCls()}-pro`;
  const antCls = '.' + getPrefixCls();
  const finalToken = useMemo(() => {
    const layout = getLayoutDesignToken(propsToken || {}, tokenContext.token);
    // Props token also feeds regular Pro components, not only layout tokens.
    return shallowMergeOneLevel<ProAliasToken>(
      proProvide.token,
      tokenContext.token,
      propsToken,
      { proComponentsCls, antCls, themeId: tokenContext.theme.id, layout },
    );
  }, [
    proProvide.token,
    tokenContext.token,
    propsToken,
    proComponentsCls,
    antCls,
    tokenContext.theme.id,
  ]);

  const [, nativeHashId] = useCacheToken<ProAliasToken>(
    tokenContext.theme as unknown as Theme<any, any>,
    [tokenContext.token, finalToken],
    {
      salt: proComponentsCls,
      override: finalToken,
      cssVar: { key: 'pro' },
    },
  );

  const hashed = resolveProConfigHashed(
    props.hashed,
    proProvide.hashed,
    tokenContext.hashId,
  );
  const hashId = hashed ? (tokenContext.hashId ?? nativeHashId) : '';

  useEffect(() => {
    dayjs.locale(locale?.locale || 'zh-cn');
  }, [locale?.locale]);

  const proConfigContextValue = useMemo(() => {
    return {
      ...proProvide,
      dark: dark ?? proProvide.dark,
      intl: resolveIntl(intl, proProvide.intl, locale?.locale),
      valueTypeMap: valueTypeMap || proProvide.valueTypeMap,
      token: finalToken,
      theme: tokenContext.theme as unknown as Theme<any, any>,
      hashed,
      hashId,
      prefixCls: resolvedPrefixCls,
    };
  }, [
    proProvide,
    dark,
    intl,
    locale?.locale,
    valueTypeMap,
    finalToken,
    tokenContext.theme,
    hashed,
    hashId,
    resolvedPrefixCls,
  ]);

  const themeConfig = { ...restConfig.theme, hashId, hashed };
  const configProviderDom = (
    <AntdConfigProvider {...restConfig} theme={themeConfig}>
      <ProConfigContext.Provider value={proConfigContextValue}>
        {autoClearCache && <CacheClean />}
        {children}
      </ProConfigContext.Provider>
    </AntdConfigProvider>
  );

  if (!autoClearCache) return configProviderDom;

  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      {configProviderDom}
    </SWRConfig>
  );
};

export const ProConfigProvider: React.FC<ProConfigProviderProps> = (props) => {
  const { needDeps, dark, token } = props;
  const proProvide = useContext(ProConfigContext);
  const { locale, theme, ...rest } = useContext(
    AntdConfigProvider.ConfigContext,
  );

  // Only dependency wrappers with no explicit configuration may reuse a parent.
  const isNullProvide =
    needDeps &&
    proProvide.hashId !== undefined &&
    Object.keys(props).every((key) => key === 'children' || key === 'needDeps');

  if (isNullProvide) return <>{props.children}</>;

  const configProvider = {
    ...rest,
    locale: locale || zh_CN,
    theme: omitUndefined({
      ...theme,
      algorithm: resolveThemeAlgorithm(theme?.algorithm, dark, proProvide.dark),
    }),
  };

  return (
    <AntdConfigProvider {...configProvider}>
      <ConfigProviderContainer {...props} token={token} />
    </AntdConfigProvider>
  );
};

export const ProProvider = ProConfigContext;

export default ProConfigContext;
