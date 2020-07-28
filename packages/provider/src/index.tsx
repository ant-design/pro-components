import React, { useContext } from 'react';
import { noteOnce } from 'rc-util/lib/warning';
import zhCN from './locale/zh_CN';
import enUS from './locale/en_US';
import viVN from './locale/vi_VN';
import itIT from './locale/it_IT';
import esES from './locale/es_ES';
import jaJP from './locale/ja_JP';
import ruRU from './locale/ru_RU';
import msMY from './locale/ms_MY';
import zhTW from './locale/zh_TW';
import frFR from './locale/fr_FR';

export const getLang = (): string => {
  const isNavigatorLanguageValid =
    typeof navigator !== 'undefined' && typeof navigator.language === 'string';
  const browserLang = isNavigatorLanguageValid
    ? navigator.language.split('-').join('{{BaseSeparator}}')
    : '';
  const lang = typeof localStorage !== 'undefined' ? window.localStorage.getItem('umi_locale') : '';
  return lang || browserLang || '';
};

export interface IntlType {
  locale: string;
  getMessage: (id: string, defaultMessage: string) => string;
}

function get(source: object, path: string, defaultValue?: string): string | undefined {
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
 * 创建一个操作函数
 * @param locale
 * @param localeMap
 */
const createIntl = (locale: string, localeMap: { [key: string]: any }): IntlType => ({
  getMessage: (id: string, defaultMessage: string) =>
    get(localeMap, id, defaultMessage) || defaultMessage,
  locale,
});

const zhCNIntl = createIntl('zh_CN', zhCN);
const enUSIntl = createIntl('en_US', enUS);
const viVNIntl = createIntl('vi_VN', viVN);
const itITIntl = createIntl('it_IT', itIT);
const jaJPIntl = createIntl('ja_JP', jaJP);
const esESIntl = createIntl('es_ES', esES);
const ruRUIntl = createIntl('ru_RU', ruRU);
const msMYIntl = createIntl('ms_MY', msMY);
const zhTWIntl = createIntl('zh_TW', zhTW);
const frFRIntl = createIntl('fr_FR', frFR);

const intlMap = {
  'zh-CN': zhCNIntl,
  'en-US': enUSIntl,
  'vi-VN': viVNIntl,
  'it-IT': itITIntl,
  'js-JP': jaJPIntl,
  'es-ES': esESIntl,
  'ru-RU': ruRUIntl,
  'ms-MY': msMYIntl,
  'zh-TW': zhTWIntl,
  'fr-FR': frFRIntl,
};

export { enUSIntl, zhCNIntl, viVNIntl, itITIntl, jaJPIntl, esESIntl, ruRUIntl, msMYIntl, zhTWIntl };

const IntlContext = React.createContext<{
  intl: IntlType;
}>({
  intl: intlMap[getLang() || ''] || zhCNIntl,
});

const { Consumer: IntlConsumer, Provider: IntlProvider } = IntlContext;

export { IntlConsumer, IntlProvider, createIntl };

export function useIntl(): IntlType {
  const context = useContext(IntlContext);

  noteOnce(
    !!context.intl,
    `
为了提升兼容性  
<IntlProvider value={zhCNIntl}/>
需要修改为:
<IntlProvider
  value={{
    intl: zhCNIntl,
  }}
/>
我们将会在下个版本中删除它
    `,
  );

  noteOnce(
    !!context.intl,
    `
To improve compatibility
  <IntlProvider value={zhCNIntl}/>
Need to be modified to:
  <IntlProvider
    value={{
      intl: zhCNIntl,
    }}
  />
We will remove it in the next version
    `,
  );

  if (!context.intl) {
    return (context as unknown) as IntlType;
  }
  return context.intl;
}

export default IntlContext;
