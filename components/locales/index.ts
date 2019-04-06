import zhLocal from './zh-CN';
import zhTWLocal from './zh-TW';
import enTWLocal from './en-US';

const locales = { 'zh-CN': zhLocal, 'zh-TW': zhTWLocal, 'en-US': enTWLocal };

export type langType = keyof typeof locales;

export default (
  lang?: langType,
): {
  [key: string]: string;
} => {
  if (lang) {
    return locales[lang];
  }
  const g_lang =
    ((window as unknown) as {
      g_lang: keyof typeof locales;
    }).g_lang || navigator.language;
  return locales[g_lang];
};
