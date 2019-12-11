import zhLocal from './zh-CN';
import zhTWLocal from './zh-TW';
import enUSLocal from './en-US';
import itITLocal from './it-IT';
import { isBrowser } from '../utils/utils';

const locales = {
  'zh-CN': zhLocal,
  'zh-TW': zhTWLocal,
  'en-US': enUSLocal,
  'it-IT': itITLocal,
};

interface GLocaleWindow {
  g_locale: keyof typeof locales;
}

export type localeType = keyof typeof locales;

const getLanguage = (): string => {
  // support ssr
  let lang;
  if (isBrowser()) {
    lang = window.localStorage.getItem('umi_locale');
  }
  return (
    lang ||
    ((window as unknown) as GLocaleWindow).g_locale ||
    navigator.language
  );
};

export { getLanguage };

export default (
  locale?: localeType,
): {
  [key: string]: string;
} => {
  if (locale) {
    return locales[locale];
  }
  const gLocale = getLanguage();
  if (locales[gLocale]) {
    return locales[gLocale];
  }
  return locales['zh-CN'];
};
