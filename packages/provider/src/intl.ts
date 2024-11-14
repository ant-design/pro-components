import { get } from 'rc-util';
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
import zhTW from './locale/zh_TW';

export type IntlType = {
  locale: string;
  getMessage: (id: string, defaultMessage: string) => string;
};

/**
 * 创建一个国际化的操作函数
 *
 * @param locale
 * @param localeMap
 */
export const createIntl = (
  locale: string,
  localeMap: Record<string, any>,
): IntlType => ({
  getMessage: (id: string, defaultMessage: string) => {
    const msg =
      get(localeMap, id.replace(/\[(\d+)\]/g, '.$1').split('.')) || '';
    if (msg) return msg;
    const localKey = locale.replace('_', '-');
    if (localKey === 'zh-CN') {
      return defaultMessage;
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const intl = intlMap['zh-CN'];
    return intl ? intl.getMessage(id, defaultMessage) : defaultMessage;
  },
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
const thTHIntl = createIntl('th_TH', thTH);
const csCZIntl = createIntl('cs_cz', csCZ);
const skSKIntl = createIntl('sk_SK', skSK);
const heILIntl = createIntl('he_IL', heIL);
const ukUAIntl = createIntl('uk_UA', ukUA);
const uzUZIntl = createIntl('uz_UZ', uzUZ);
const nlNLIntl = createIntl('nl_NL', nlNL);
const roROIntl = createIntl('ro_RO', roRO);
const svSEIntl = createIntl('sv_SE', svSE);

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
  'th-TH': thTHIntl,
  'cs-CZ': csCZIntl,
  'sk-SK': skSKIntl,
  'he-IL': heILIntl,
  'uk-UA': ukUAIntl,
  'uz-UZ': uzUZIntl,
  'nl-NL': nlNLIntl,
  'ro-RO': roROIntl,
  'sv-SE': svSEIntl,
};

const intlMapKeys = Object.keys(intlMap);

/**
 * 根据 antd 的 key 来找到的 locale 插件的 key
 *
 * @param localeKey
 */
export const findIntlKeyByAntdLocaleKey = <T extends string>(localeKey?: T) => {
  const localeName = (localeKey || 'zh-CN').toLocaleLowerCase();
  return intlMapKeys.find((intlKey) => {
    const LowerCaseKey = intlKey.toLocaleLowerCase();
    return LowerCaseKey.includes(localeName);
  }) as T;
};

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
  zhTWIntl,
};
