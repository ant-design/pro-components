/** Default fraction digits for money input */
export const DefaultPrecisionCont = 2;

// Money locale formatting
const defaultMoneyIntl = {
  currency: 'CNY',
  style: 'currency',
};

const enMoneyIntl = {
  style: 'currency',
  currency: 'USD',
};

const ruMoneyIntl = {
  style: 'currency',
  currency: 'RUB',
};

const rsMoneyIntl = {
  style: 'currency',
  currency: 'RSD',
};

const msMoneyIntl = {
  style: 'currency',
  currency: 'MYR',
};

const ptMoneyIntl = {
  style: 'currency',
  currency: 'BRL',
};

const intlMap = {
  default: defaultMoneyIntl,
  'zh-Hans-CN': {
    currency: 'CNY',
    style: 'currency',
  },
  'en-US': enMoneyIntl,
  'ru-RU': ruMoneyIntl,
  'ms-MY': msMoneyIntl,
  'sr-RS': rsMoneyIntl,
  'pt-BR': ptMoneyIntl,
};

const normalizeLocale = (locale: string | false): string | undefined =>
  locale ? locale.replace('_', '-') : undefined;

const isLocaleSupported = (locale?: string): boolean => {
  if (!locale) return false;
  try {
    return (
      Intl.NumberFormat.supportedLocalesOf([locale], {
        localeMatcher: 'lookup',
      }).length > 0
    );
  } catch {
    return false;
  }
};

/** 解析用于 Intl 的 locale，不支持时回退 zh-Hans-CN */
export const resolveNumberLocale = (locale?: string | false): string => {
  const normalized = normalizeLocale(locale || false);
  return isLocaleSupported(normalized) ? normalized || 'zh-Hans-CN' : 'zh-Hans-CN';
};

type CurrencyAffixes = { prefix: string; suffix: string };

/**
 * 探测 Intl 输出中货币符号的位置与间隔。
 * 前置符号（如 `¥1.00`）返回 `{ prefix: '¥', suffix: '' }`，
 * 后置符号（如 `1,00 ₽`）返回 `{ prefix: '', suffix: ' ₽' }`。
 */
const probeCurrencyAffixes = (
  formatter: Intl.NumberFormat,
): CurrencyAffixes => {
  const probe = formatter.format(1);
  const chars = [...probe];
  const firstDigit = probe.search(/\d/);
  const lastDigit =
    chars.length - 1 - chars.slice().reverse().findIndex((c) => /\d/.test(c));
  return {
    prefix: firstDigit > 0 ? probe.slice(0, firstDigit) : '',
    suffix:
      lastDigit >= 0 && lastDigit < chars.length - 1
        ? probe.slice(lastDigit + 1)
        : '',
  };
};

/** 拆出货币后缀中的间隔与符号（如 ` ₽` → ` ` + `₽`） */
export const splitSuffixSpacing = (suffix: string) => {
  const symbol = suffix.replace(/[\s\u00a0\u202f]/g, '');
  const spacing = suffix.slice(0, suffix.length - symbol.length);
  return { spacing, symbol };
};

export type LocaleMoneyMeta = {
  /** 千分位分隔符，如 `,`、` `（U+00A0） */
  groupSeparator: string;
  /** 小数分隔符，如 `.`、`,` */
  decimalSeparator: string;
  /** 货币符号前置（如 `¥`），后置 locale 为空串 */
  prefixAffix: string;
  /** 货币符号后置（如 ` ₽`，含间隔），前置 locale 为空串 */
  suffixAffix: string;
};

/**
 * 获取 locale 的数字分隔符与货币符号位置，
 * 用于编辑态输入框的 formatter / parser 以及只读态的符号拼接。
 */
export const getLocaleMoneyMeta = (
  locale?: string | false,
  currencyConfig?: Record<string, any>,
): LocaleMoneyMeta => {
  const actual = resolveNumberLocale(locale);

  const parts = new Intl.NumberFormat(actual).formatToParts(1234567.891);
  const groupSeparator =
    parts.find((part) => part.type === 'group')?.value ?? ',';
  const decimalSeparator =
    parts.find((part) => part.type === 'decimal')?.value ?? '.';

  let prefixAffix = '';
  let suffixAffix = '';
  try {
    const currencyFormatter = new Intl.NumberFormat(actual, {
      ...(intlMap[actual as 'zh-Hans-CN'] || defaultMoneyIntl),
      ...(currencyConfig as Intl.NumberFormatOptions),
    } as Intl.NumberFormatOptions);
    const { prefix, suffix } = probeCurrencyAffixes(currencyFormatter);
    prefixAffix = prefix;
    suffixAffix = suffix;
  } catch {
    // 探测失败时退化为前置符号
  }

  return { groupSeparator, decimalSeparator, prefixAffix, suffixAffix };
};

/**
 * A function that formats the number.
 * @param {string | false} locale - The currency symbol, which is the first parameter of the
 * formatMoney function.
 * @param {number | string | undefined} paramsText - The text to be formatted
 * @param {number} precision - number, // decimal places
 * @param {any} [config] - the configuration of the number format, which is the same as the
 * configuration of the number format in the Intl.NumberFormat method.
 * @param {string} [moneySymbol] - the currency symbol to display. Its placement follows the
 * locale convention: prefix for `¥`/`$` styles, suffix for `₽` styles (e.g. ru-RU).
 * @returns A function that takes in 4 parameters and returns a string.
 */
export const getTextByLocale = (
  locale: string | false,
  paramsText: number | string | undefined,
  precision: number,
  config?: any,
  moneySymbol: string = '',
) => {
  let moneyText: number | string | undefined = paramsText
    ?.toString()
    .replace(/[\s,\u00a0\u202f]/g, '');
  if (typeof moneyText === 'string') {
    const parsedNum = Number(moneyText);
    // 转换数字为NaN时，返回原始值展示
    if (Number.isNaN(parsedNum)) return moneyText;
    moneyText = parsedNum;
  }
  if (!moneyText && moneyText !== 0) return '';

  const actualLocale = resolveNumberLocale(locale);

  try {
    // Formatting the number, when readonly moneySymbol = false, unused currency.
    const initNumberFormatter = new Intl.NumberFormat(actualLocale, {
      ...(intlMap[(locale as 'zh-Hans-CN') || 'zh-Hans-CN'] ||
        defaultMoneyIntl),
      maximumFractionDigits: precision,
      ...config,
    });

    const finalMoneyText = initNumberFormatter.format(moneyText);
    const { prefix, suffix } = probeCurrencyAffixes(initNumberFormatter);

    // 兼容正负号：符号可能出现在货币符号之前（如 -$100.00）
    let sign = '';
    let core = finalMoneyText;
    if (prefix && core.startsWith(prefix)) {
      core = core.slice(prefix.length);
    } else if (['+', '-'].includes(core[0] || '')) {
      sign = core[0];
      core = core.slice(1);
      if (prefix && core.startsWith(prefix)) {
        core = core.slice(prefix.length);
      }
    }
    if (suffix && core.endsWith(suffix)) {
      core = core.slice(0, core.length - suffix.length);
    }

    if (!moneySymbol) {
      // 关闭货币符号时仅保留数字（保留 locale 分隔符）
      return `${sign}${core}`;
    }
    if (suffix) {
      // 货币符号后置的 locale（如 ru-RU）：1 234,56 ₽
      const { spacing } = splitSuffixSpacing(suffix);
      return `${sign}${core}${spacing}${moneySymbol}`;
    }
    // 货币符号前置的 locale：保持既有展示顺序（¥100.00 / $-100.00）
    return `${moneySymbol}${sign}${core}`;
  } catch {
    return moneyText;
  }
};
