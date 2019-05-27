import enTWLocal from './en-US';
import zhLocal from './zh-CN';
import zhTWLocal from './zh-TW';

const locales = { 'zh-CN': zhLocal, 'zh-TW': zhTWLocal, 'en-US': enTWLocal };

export type localeType = keyof typeof locales;

export default (
  locale?: localeType,
): {
  [key: string]: string;
} => {
  if (locale) {
    return locales[locale];
  }
  const gLocale =
    ((window as unknown) as {
      g_locale: keyof typeof locales;
    }).g_locale || navigator.language;
  if (locales[gLocale]) {
    return locales[gLocale];
  }
  return locales['zh-CN'];
};
