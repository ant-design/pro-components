import zhLocal from './zh-CN';
import zhTWLocal from './zh-TW';
import enTWLocal from './en-US';

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
  const g_locale =
    ((window as unknown) as {
      g_locale: keyof typeof locales;
    }).g_locale || navigator.language;
  return locales[g_locale];
};
