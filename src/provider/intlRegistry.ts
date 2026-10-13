import type { IntlType } from './intlCore';
import {
  arEGIntl,
  caESIntl,
  csCZIntl,
  deDEIntl,
  enGBIntl,
  enUSIntl,
  esESIntl,
  faIRIntl,
  frFRIntl,
  heILIntl,
  hrHRIntl,
  idIDIntl,
  itITIntl,
  jaJPIntl,
  koKRIntl,
  mnMNIntl,
  msMYIntl,
  nlNLIntl,
  plPLIntl,
  ptBRIntl,
  roROIntl,
  ruRUIntl,
  skSKIntl,
  srRSIntl,
  svSEIntl,
  thTHIntl,
  trTRIntl,
  ukUAIntl,
  urPKIntl,
  uzUZIntl,
  viVNIntl,
  zhCNIntl,
  zhHKIntl,
  zhTWIntl,
} from './intlInstances';

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
  'zh-HK': zhHKIntl,
  'fr-FR': frFRIntl,
  'pt-BR': ptBRIntl,
  'ko-KR': koKRIntl,
  'id-ID': idIDIntl,
  'de-DE': deDEIntl,
  'fa-IR': faIRIntl,
  'tr-TR': trTRIntl,
  'pl-PL': plPLIntl,
  'hr-HR': hrHRIntl,
  'th-TH': thTHIntl,
  'cs-CZ': csCZIntl,
  'sk-SK': skSKIntl,
  'he-IL': heILIntl,
  'uk-UA': ukUAIntl,
  'ur-PK': urPKIntl,
  'uz-UZ': uzUZIntl,
  'nl-NL': nlNLIntl,
  'ro-RO': roROIntl,
  'sv-SE': svSEIntl,
} satisfies Record<string, IntlType>;

type LocaleDashKey = keyof typeof intlMap;
const intlMapKeys = /* @__PURE__ */ Object.keys(intlMap) as LocaleDashKey[];

/**
 * 根据 antd 的 locale key 找到对应 intl 的 key。
 *
 * 匹配顺序：
 * 1. 完全一致（大小写不敏感）
 * 2. 同语族前缀匹配，例如 `'zh'` → `'zh-CN'`（取 intlMapKeys 中第一个前缀命中的）
 * 3. 兜底 `'zh-CN'`
 */
export const findIntlKeyByAntdLocaleKey = <T extends string>(
  localeKey?: T,
): T => {
  const input = (localeKey || 'zh-CN').toLowerCase();
  const exact = intlMapKeys.find((k) => k.toLowerCase() === input);
  if (exact) return exact as unknown as T;
  const prefix = input.split('-')[0] + '-';
  const prefixHit = intlMapKeys.find((k) => k.toLowerCase().startsWith(prefix));
  return ((prefixHit as string) ?? 'zh-CN') as T;
};


export { intlMap, intlMapKeys };
