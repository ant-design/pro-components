import { get } from '@rc-component/util';
import type { IntlType } from './intl';
import enGB from './locale/en_GB';
import enUS from './locale/en_US';
import itIT from './locale/it_IT';
import koKR from './locale/ko_KR';
import ruRU from './locale/ru_RU';
import zhCN from './locale/zh_CN';
import zhTW from './locale/zh_TW';

const getMessage = (messages: Record<string, any>, id: string) => {
  const value = get(messages, id.replace(/\[(\d+)\]/g, '.$1').split('.'));
  return typeof value === 'string' ? value : undefined;
};

const createRuntimeIntl = (
  locale: string,
  messages: Record<string, any>,
): IntlType => ({
  locale,
  getMessage: (id, defaultMessage) =>
    getMessage(messages, id) ?? getMessage(zhCN, id) ?? defaultMessage,
});

const runtimeIntlMap: Record<string, IntlType> = {
  'zh-CN': createRuntimeIntl('zh-CN', zhCN),
  'zh-TW': createRuntimeIntl('zh-TW', zhTW),
  'en-GB': createRuntimeIntl('en-GB', enGB),
  'en-US': createRuntimeIntl('en-US', enUS),
  'it-IT': createRuntimeIntl('it-IT', itIT),
  'ko-KR': createRuntimeIntl('ko-KR', koKR),
  'ru-RU': createRuntimeIntl('ru-RU', ruRU),
};

// Keep FieldMoney's explicit locale behavior without loading every translated
// message object through the default package entry.
const moneySymbols: Record<string, string> = {
  'ar-EG': '$',
  'ca-ES': '€',
  'cs-CZ': 'Kč',
  'de-DE': '€',
  'en-GB': '£',
  'en-US': '$',
  'es-ES': '€',
  'fa-IR': 'تومان',
  'fr-FR': '€',
  'he-IL': '₪',
  'hr-HR': 'kn',
  'id-ID': 'RP',
  'it-IT': '€',
  'ja-JP': '¥',
  'ko-KR': '₩',
  'mn-MN': '₮',
  'ms-MY': 'RM',
  'nl-NL': '€',
  'pl-PL': 'zł',
  'pt-BR': 'R$',
  'ro-RO': 'RON',
  'ru-RU': '₽',
  'sk-SK': '€',
  'sr-RS': 'RSD',
  'sv-SE': 'SEK',
  'th-TH': '฿',
  'tr-TR': '₺',
  'uk-UA': '₴',
  'ur-PK': 'Rs',
  'uz-UZ': 'UZS',
  'vi-VN': '₫',
  'zh-CN': '¥',
  'zh-HK': 'HK$',
  'zh-TW': 'NT$',
};

export const getRuntimeIntl = (locale?: string) => {
  if (!locale) return runtimeIntlMap['zh-CN'];
  const normalized = locale.replace('_', '-');
  const runtimeIntl =
    runtimeIntlMap[normalized] ||
    Object.entries(runtimeIntlMap).find(([key]) =>
      key
        .toLowerCase()
        .startsWith(`${normalized.split('-')[0].toLowerCase()}-`),
    )?.[1];
  if (runtimeIntl) return runtimeIntl;
  const symbolEntry = Object.entries(moneySymbols).find(
    ([key]) =>
      key.toLowerCase() === normalized.toLowerCase() ||
      key
        .toLowerCase()
        .startsWith(`${normalized.split('-')[0].toLowerCase()}-`),
  );
  return symbolEntry
    ? createRuntimeIntl(symbolEntry[0], { moneySymbol: symbolEntry[1] })
    : runtimeIntlMap['zh-CN'];
};

export const zhCNIntlRuntime = runtimeIntlMap['zh-CN'];
