//@ts-ignore
import type { Theme } from '@ant-design/cssinjs';
import { useCacheToken } from '@ant-design/cssinjs';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import React, { useContext, useEffect, useMemo } from 'react';
import { SWRConfig, useSWRConfig } from 'swr';
import arEG from './locale/ar_EG';
import caES from './locale/ca_ES';
import deDE from './locale/de_DE';
import enGB from './locale/en_GB';
import enUS from './locale/en_US';
import esES from './locale/es_ES';
import faIR from './locale/fa_IR';
import frFR from './locale/fr_FR';
import hrHR from './locale/hr_HR';
import idID from './locale/id_ID';
import itIT from './locale/it_IT';
import jaJP from './locale/ja_JP';
import koKR from './locale/ko_KR';
import mnMN from './locale/mn_MN';
import msMY from './locale/ms_MY';
import plPL from './locale/pl_PL';
import ptBR from './locale/pt_BR';
import ruRU from './locale/ru_RU';
import srRS from './locale/sr_RS';
import trTR from './locale/tr_TR';
import viVN from './locale/vi_VN';
import zhCN from './locale/zh_CN';
import zhTW from './locale/zh_TW';
import type { DeepPartial, ProTokenType } from './typing/layoutToken';
import { getLayoutDesignToken } from './typing/layoutToken';
import type { ProAliasToken } from './useStyle';
import { useToken } from './useStyle';
import { emptyTheme, defaultTheme } from './useStyle/token';
import { merge } from './utils/merge';

export * from './useStyle';

export { DeepPartial, ProTokenType };

export type ProSchemaValueEnumType = {
  /** @name 演示的文案 */
  text: React.ReactNode;

  /** @name 预定的颜色 */
  status?: string;
  /** @name 自定义的颜色 */
  color?: string;
  /** @name 是否禁用 */
  disabled?: boolean;
};

/**
 * 支持 Map 和 Object
 *
 * @name ValueEnum 的类型
 */
type ProSchemaValueEnumMap = Map<React.ReactText, ProSchemaValueEnumType | React.ReactNode>;

type ProSchemaValueEnumObj = Record<string, ProSchemaValueEnumType | React.ReactNode>;

export type BaseProFieldFC = {
  /** 值的类型 */
  text: React.ReactNode;
  /** 放置到组件上 props */
  fieldProps?: any;
  /**
   * 组件的渲染模式类型
   * @option read 渲染只读模式
   * @option edit 渲染编辑模式
   * */
  mode: ProFieldFCMode;
  /**
   * 简约模式
   */
  plain?: boolean;
  /** 轻量模式 */
  light?: boolean;
  /** Label */
  label?: React.ReactNode;
  /** 映射值的类型 */
  valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;
  /** 唯一的key，用于网络请求 */
  proFieldKey?: React.Key;
};

export type ProFieldFCMode = 'read' | 'edit' | 'update';

/** Render 第二个参数，里面包含了一些常用的参数 */
export type ProFieldFCRenderProps = {
  mode?: ProFieldFCMode;
  readonly?: boolean;
  placeholder?: string | string[];
  value?: any;
  onChange?: (...rest: any[]) => void;
} & BaseProFieldFC;

export type ProRenderFieldPropsType = {
  /**
   * 自定义只读模式的渲染器
   * @params props 关于dom的配置
   * @params dom 默认的 dom
   * @return 返回一个用于读的 dom
   */
  render?:
    | ((
        text: any,
        props: Omit<ProFieldFCRenderProps, 'value' | 'onChange'>,
        dom: JSX.Element,
      ) => JSX.Element)
    | undefined;
  /**
   * 一个自定义的编辑渲染器。
   * @params text 默认的值类型
   * @params props 关于dom的配置
   * @params dom 默认的 dom
   * @return 返回一个用于编辑的dom
   */
  renderFormItem?:
    | ((text: any, props: ProFieldFCRenderProps, dom: JSX.Element) => JSX.Element)
    | undefined;
};

export type IntlType = {
  locale: string;
  getMessage: (id: string, defaultMessage: string) => string;
};

/**
 * 安全的从一个对象中读取相应的值
 * @param source
 * @param path
 * @param defaultValue
 * @returns
 */
function get(
  source: Record<string, unknown>,
  path: string,
  defaultValue?: string,
): string | undefined {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = source;
  let message = defaultValue;
  // eslint-disable-next-line no-restricted-syntax
  for (const p of paths) {
    message = Object(result)[p];
    result = Object(result)[p];
    if (message === undefined) {
      return defaultValue;
    }
  }
  return message;
}

/**
 * 创建一个国际化的操作函数
 *
 * @param locale
 * @param localeMap
 */
export const createIntl = (locale: string, localeMap: Record<string, any>): IntlType => ({
  getMessage: (id: string, defaultMessage: string) =>
    get(localeMap, id, defaultMessage) || defaultMessage,
  locale,
});

const mnMNIntl = createIntl('mn_MN', mnMN);
const arEGIntl = createIntl('ar_EG', arEG);
const zhCNIntl = createIntl('zh_CN', zhCN);
const enUSIntl = createIntl('en_US', enUS);
const enGBIntl = createIntl('en_GB', enGB);
const viVNIntl = createIntl('vi_VN', viVN);
const itITIntl = createIntl('it_IT', itIT);
const jaJPIntl = createIntl('ja_JP', jaJP);
const esESIntl = createIntl('es_ES', esES);
const caESIntl = createIntl('ca_ES', caES);
const ruRUIntl = createIntl('ru_RU', ruRU);
const srRSIntl = createIntl('sr_RS', srRS);
const msMYIntl = createIntl('ms_MY', msMY);
const zhTWIntl = createIntl('zh_TW', zhTW);
const frFRIntl = createIntl('fr_FR', frFR);
const ptBRIntl = createIntl('pt_BR', ptBR);
const koKRIntl = createIntl('ko_KR', koKR);
const idIDIntl = createIntl('id_ID', idID);
const deDEIntl = createIntl('de_DE', deDE);
const faIRIntl = createIntl('fa_IR', faIR);
const trTRIntl = createIntl('tr_TR', trTR);
const plPLIntl = createIntl('pl_PL', plPL);
const hrHRIntl = createIntl('hr_', hrHR);

const intlMap = {
  'mn-MN': mnMNIntl,
  'ar-EG': arEGIntl,
  'zh-CN': zhCNIntl,
  'en-US': enUSIntl,
  'en-GB': enGBIntl,
  'vi-VN': viVNIntl,
  'it-IT': itITIntl,
  'ja-JP': jaJPIntl,
  'es-ES': esESIntl,
  'ca-ES': caESIntl,
  'ru-RU': ruRUIntl,
  'sr-RS': srRSIntl,
  'ms-MY': msMYIntl,
  'zh-TW': zhTWIntl,
  'fr-FR': frFRIntl,
  'pt-BR': ptBRIntl,
  'ko-KR': koKRIntl,
  'id-ID': idIDIntl,
  'de-DE': deDEIntl,
  'fa-IR': faIRIntl,
  'tr-TR': trTRIntl,
  'pl-PL': plPLIntl,
  'hr-HR': hrHRIntl,
};

const intlMapKeys = Object.keys(intlMap);

export type ParamsType = Record<string, any>;

export {
  mnMNIntl,
  arEGIntl,
  enUSIntl,
  enGBIntl,
  zhCNIntl,
  viVNIntl,
  itITIntl,
  jaJPIntl,
  esESIntl,
  caESIntl,
  ruRUIntl,
  srRSIntl,
  msMYIntl,
  zhTWIntl,
  frFRIntl,
  ptBRIntl,
  koKRIntl,
  idIDIntl,
  deDEIntl,
  faIRIntl,
  trTRIntl,
  plPLIntl,
  hrHRIntl,
  intlMap,
  intlMapKeys,
};

/**
 * 自带的token 配置
 */
export type ConfigContextPropsType = {
  intl: IntlType;
  valueTypeMap: Record<string, ProRenderFieldPropsType>;
  token?: ProAliasToken;
  hashId?: string;
  theme: Theme<any, any>;
};

/* Creating a context object with the default values. */
const ConfigContext = React.createContext<ConfigContextPropsType>({
  intl: {
    ...zhCNIntl,
    locale: 'default',
  },
  valueTypeMap: {},
  theme: emptyTheme,
  token: defaultTheme as ProAliasToken,
});

export const { Consumer: ConfigConsumer, Provider: ProConfigProvider } = ConfigContext;

/**
 * 根据 antd 的 key 来找到的 locale 插件的 key
 *
 * @param localeKey
 */
const findIntlKeyByAntdLocaleKey = <T extends string | undefined>(localeKey: T) => {
  if (!localeKey) {
    return 'zh-CN' as T;
  }
  const localeName = localeKey.toLocaleLowerCase();
  return intlMapKeys.find((intlKey) => {
    const LowerCaseKey = intlKey.toLocaleLowerCase();
    return LowerCaseKey.includes(localeName);
  }) as T;
};

/**
 * 组件解除挂载后清空一下 cache
 *
 * @returns
 */
const CacheClean = () => {
  const { cache } = useSWRConfig();

  useEffect(() => {
    return () => {
      // is a map
      // @ts-ignore
      cache.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

/**
 * 如果没有配置 locale，这里组件会根据 antd 的 key 来自动选择
 *
 * @param param0
 */
export const ConfigProviderWrap: React.FC<{
  children: React.ReactNode;
  autoClearCache?: boolean;
  token?: DeepPartial<ProAliasToken>;
  needDeps?: boolean;
}> = (props) => {
  const { children, autoClearCache = false, token: propsToken, needDeps = false } = props;
  const { locale, getPrefixCls } = useContext(AntdConfigProvider.ConfigContext);
  const tokenContext = useToken?.();

  console.log(tokenContext);
  // 如果 locale 不存在自动注入的 AntdConfigProvider
  const ANTDProvider = locale === undefined ? AntdConfigProvider : React.Fragment;
  const proProvide = useContext(ConfigContext);

  const isNullProvide =
    needDeps &&
    proProvide.hashId !== undefined &&
    Object.keys(props).sort().join('-') === 'children-needDeps';

  /**
   * pro 的 类
   * @type {string}
   * @example .ant-pro
   */
  const proComponentsCls = `.${getPrefixCls()}-pro`;

  const salt = `${proComponentsCls}`;
  const antCls = '.' + getPrefixCls();

  const proProvideValue = useMemo(() => {
    if (isNullProvide) return null;
    const localeName = locale?.locale;
    const key = findIntlKeyByAntdLocaleKey(localeName);
    // antd 的 key 存在的时候以 antd 的为主
    const intl =
      localeName && proProvide.intl?.locale === 'default'
        ? intlMap[key!]
        : proProvide.intl || intlMap[key!];

    /**
     * 合并一下token，不然导致嵌套 token 失效
     */
    const proLayoutTokenMerge = propsToken
      ? getLayoutDesignToken(merge(proProvide.token?.layout, propsToken.layout || {}), defaultTheme)
      : getLayoutDesignToken(proProvide.token?.layout || {}, defaultTheme);

    return {
      ...proProvide,
      token: merge(proProvide.token, {
        proComponentsCls,
        antCls,
        layout: proLayoutTokenMerge,
      }),
      intl: intl || zhCNIntl,
    };
  }, [isNullProvide, locale?.locale, proProvide, propsToken, proComponentsCls, antCls]);

  const finalToken = {
    ...(proProvideValue?.token || {}),
    proComponentsCls,
  };

  const [token, nativeHashId] = useCacheToken<ProAliasToken>(
    tokenContext.theme,
    [tokenContext.token, finalToken ?? {}],
    {
      salt,
    },
  );

  const hashId = useMemo(() => {
    if (process.env.NODE_ENV?.toLowerCase() !== 'test') return nativeHashId;
    return '';
  }, [nativeHashId]);

  const configProviderDom = useMemo(() => {
    if (isNullProvide) return <>{children}</>;
    // 自动注入 antd 的配置
    const configProvider =
      locale === undefined
        ? {
            locale: zh_CN,
            theme: { hashId: hashId, hashed: process.env.NODE_ENV?.toLowerCase() !== 'test' },
          }
        : {};

    const provide = (
      <ANTDProvider {...configProvider}>
        <ProConfigProvider value={{ ...proProvideValue!, token, hashId }}>
          <>
            {autoClearCache && <CacheClean />}
            {children}
          </>
        </ProConfigProvider>
      </ANTDProvider>
    );

    return (
      <div className={`${getPrefixCls?.('pro') || 'ant-pro'}${hashId ? ' ' + hashId : ''}`}>
        {provide}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoClearCache, children, getPrefixCls, hashId, locale, proProvideValue, token]);

  if (!autoClearCache) return configProviderDom;

  return <SWRConfig value={{ provider: () => new Map() }}>{configProviderDom}</SWRConfig>;
};

/**
 * It returns the intl object from the context if it exists, otherwise it returns the intl object for
 * the current locale
 * @returns The return value of the function is the intl object.
 */
export function useIntl(): IntlType {
  const { locale } = useContext(AntdConfigProvider.ConfigContext);
  const { intl } = useContext(ConfigContext);

  if (intl && intl.locale !== 'default') {
    return intl || zhCNIntl;
  }

  if (locale?.locale) {
    return intlMap[findIntlKeyByAntdLocaleKey(locale.locale)] || zhCNIntl;
  }

  return zhCNIntl;
}
export const ProProvider = ConfigContext;

export default ConfigContext;
