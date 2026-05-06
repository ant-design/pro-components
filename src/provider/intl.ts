import { get } from '@rc-component/util';
import arEG from './locale/ar_EG';
import caES from './locale/ca_ES';
import csCZ from './locale/cs_CZ';
import deDE from './locale/de_DE';
import enGB from './locale/en_GB';
import enUS from './locale/en_US';
import esES from './locale/es_ES';
import faIR from './locale/fa_IR';
import frFR from './locale/fr_FR';
import heIL from './locale/he_IL';
import hrHR from './locale/hr_HR';
import idID from './locale/id_ID';
import itIT from './locale/it_IT';
import jaJP from './locale/ja_JP';
import koKR from './locale/ko_KR';
import mnMN from './locale/mn_MN';
import msMY from './locale/ms_MY';
import nlNL from './locale/nl_NL';
import plPL from './locale/pl_PL';
import ptBR from './locale/pt_BR';
import roRO from './locale/ro_RO';
import ruRU from './locale/ru_RU';
import skSK from './locale/sk_SK';
import srRS from './locale/sr_RS';
import svSE from './locale/sv_SE';
import thTH from './locale/th_TH';
import trTR from './locale/tr_TR';
import ukUA from './locale/uk_UA';
import uzUZ from './locale/uz_UZ';
import viVN from './locale/vi_VN';
import zhCN from './locale/zh_CN';
import zhHK from './locale/zh_HK';
import zhTW from './locale/zh_TW';

export type IntlType = {
  locale: string;
  getMessage: (id: string, defaultMessage: string) => string;
};

/**
 * `zh-CN` 的 messages 快照，供 `createIntl` 的跨语言 fallback 使用。
 *
 * 这里要显式保存一份 messages 引用，而不是在运行时从 `intlMap['zh-CN'].getMessage` 取值，
 * 避免"createIntl 自身被改动为其他 fallback 策略时出现递归"的风险。
 */
const zhCNMessages: Record<string, any> = zhCN;

/**
 * 从 locale messages 中按 id 取值的工具。id 支持点号路径和方括号下标：
 * - `a.b.c`
 * - `a.b[0].c`
 */
const getMessageByPath = (
  messages: Record<string, any>,
  id: string,
): string => {
  return (get(messages, id.replace(/\[(\d+)\]/g, '.$1').split('.')) ||
    '') as string;
};

/**
 * 创建一个国际化的操作函数。
 *
 * 当某 locale 找不到 id 对应的文案时，按以下顺序回退：
 * 1. zh-CN locale 自身找不到 → 返回 `defaultMessage`
 * 2. 其他 locale 找不到 → 去 zh-CN messages 里找；还找不到才返回 `defaultMessage`
 *
 * @param locale 语言标识，如 `'zh_CN'` / `'en_US'`（注意是下划线形式）
 * @param localeMap 该语言对应的 messages 对象
 */
export const createIntl = (
  locale: string,
  localeMap: Record<string, any>,
): IntlType => ({
  getMessage: (id: string, defaultMessage: string) => {
    const msg = getMessageByPath(localeMap, id);
    if (msg) return msg;
    const localeKeyDashed = locale.replace('_', '-');
    if (localeKeyDashed === 'zh-CN') {
      return defaultMessage;
    }
    // 使用本模块顶层缓存的 zh-CN messages，而不是反向查 intlMap['zh-CN']，
    // 避免 createIntl 实现演进时引入潜在递归。
    const fallback = getMessageByPath(zhCNMessages, id);
    return fallback || defaultMessage;
  },
  locale,
});

/**
 * 所有内置语言的原始 messages 表。新增语言只需在此处追加一项。
 * Key 使用 antd locale 的 `xx_YY` 形态（带下划线）。
 */
const localeMessages = {
  mn_MN: mnMN,
  ar_EG: arEG,
  zh_CN: zhCN,
  en_US: enUS,
  en_GB: enGB,
  vi_VN: viVN,
  it_IT: itIT,
  ja_JP: jaJP,
  es_ES: esES,
  ca_ES: caES,
  ru_RU: ruRU,
  sr_RS: srRS,
  ms_MY: msMY,
  zh_TW: zhTW,
  zh_HK: zhHK,
  fr_FR: frFR,
  pt_BR: ptBR,
  ko_KR: koKR,
  id_ID: idID,
  de_DE: deDE,
  fa_IR: faIR,
  tr_TR: trTR,
  pl_PL: plPL,
  hr_HR: hrHR,
  th_TH: thTH,
  cs_CZ: csCZ,
  sk_SK: skSK,
  he_IL: heIL,
  uk_UA: ukUA,
  uz_UZ: uzUZ,
  nl_NL: nlNL,
  ro_RO: roRO,
  sv_SE: svSE,
} as const;

type LocaleUnderscoreKey = keyof typeof localeMessages;
/** `zh-CN` 这种短横线形态的 key 类型。 */
type LocaleDashKey =
  LocaleUnderscoreKey extends `${infer A}_${infer B}` ? `${A}-${B}` : never;

/** 将 `zh_CN` 转为 `zh-CN`。 */
const toDashKey = <K extends LocaleUnderscoreKey>(k: K) =>
  k.replace('_', '-') as LocaleDashKey;

/**
 * `antd locale key (xx-YY)` → IntlType 的映射表。
 * 所有条目都从 `localeMessages` 统一派生，避免手写导致漏项。
 */
const intlMap = Object.fromEntries(
  (Object.keys(localeMessages) as LocaleUnderscoreKey[]).map((k) => [
    toDashKey(k),
    createIntl(k, localeMessages[k]),
  ]),
) as Record<LocaleDashKey, IntlType>;

const intlMapKeys = Object.keys(intlMap) as LocaleDashKey[];

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

// 所有内置 intl 实例的命名导出；外部代码（table/field 等）依赖这些名字。
const arEGIntl = intlMap['ar-EG'];
const caESIntl = intlMap['ca-ES'];
const csCZIntl = intlMap['cs-CZ'];
const deDEIntl = intlMap['de-DE'];
const enGBIntl = intlMap['en-GB'];
const enUSIntl = intlMap['en-US'];
const esESIntl = intlMap['es-ES'];
const faIRIntl = intlMap['fa-IR'];
const frFRIntl = intlMap['fr-FR'];
const heILIntl = intlMap['he-IL'];
const hrHRIntl = intlMap['hr-HR'];
const idIDIntl = intlMap['id-ID'];
const itITIntl = intlMap['it-IT'];
const jaJPIntl = intlMap['ja-JP'];
const koKRIntl = intlMap['ko-KR'];
const mnMNIntl = intlMap['mn-MN'];
const msMYIntl = intlMap['ms-MY'];
const nlNLIntl = intlMap['nl-NL'];
const plPLIntl = intlMap['pl-PL'];
const ptBRIntl = intlMap['pt-BR'];
const roROIntl = intlMap['ro-RO'];
const ruRUIntl = intlMap['ru-RU'];
const skSKIntl = intlMap['sk-SK'];
const srRSIntl = intlMap['sr-RS'];
const svSEIntl = intlMap['sv-SE'];
const thTHIntl = intlMap['th-TH'];
const trTRIntl = intlMap['tr-TR'];
const ukUAIntl = intlMap['uk-UA'];
const uzUZIntl = intlMap['uz-UZ'];
const viVNIntl = intlMap['vi-VN'];
const zhCNIntl = intlMap['zh-CN'];
const zhHKIntl = intlMap['zh-HK'];
const zhTWIntl = intlMap['zh-TW'];

export {
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
  intlMap,
  intlMapKeys,
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
  uzUZIntl,
  viVNIntl,
  zhCNIntl,
  zhHKIntl,
  zhTWIntl,
};
