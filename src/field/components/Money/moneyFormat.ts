/** Default fraction digits for money input */
export const DefaultPrecisionCont = 2;

// Money locale formatting
const defaultMoneyIntl = new Intl.NumberFormat('zh-Hans-CN', {
  currency: 'CNY',
  style: 'currency',
});

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

/**
 * A function that formats the number.
 * @param {string | false} locale - The currency symbol, which is the first parameter of the
 * formatMoney function.
 * @param {number | string | undefined} paramsText - The text to be formatted
 * @param {number} precision - number, // decimal places
 * @param {any} [config] - the configuration of the number format, which is the same as the
 * configuration of the number format in the Intl.NumberFormat method.
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
    .replaceAll(',', '');
  if (typeof moneyText === 'string') {
    const parsedNum = Number(moneyText);
    // 转换数字为NaN时，返回原始值展示
    if (Number.isNaN(parsedNum)) return moneyText;
    moneyText = parsedNum;
  }
  if (!moneyText && moneyText !== 0) return '';

  let supportFormat = false;

  try {
    supportFormat =
      locale !== false &&
      Intl.NumberFormat.supportedLocalesOf([locale.replace('_', '-')], {
        localeMatcher: 'lookup',
      }).length > 0;
  } catch (error) {}

  try {
    // Formatting the number, when readonly moneySymbol = false, unused currency.
    const initNumberFormatter = new Intl.NumberFormat(
      supportFormat && locale !== false
        ? locale?.replace('_', '-') || 'zh-Hans-CN'
        : 'zh-Hans-CN',
      {
        ...(intlMap[(locale as 'zh-Hans-CN') || 'zh-Hans-CN'] ||
          defaultMoneyIntl),
        maximumFractionDigits: precision,
        ...config,
      },
    );

    const finalMoneyText = initNumberFormatter.format(moneyText);

    // 同时出现两个符号的情况需要处理
    const doubleSymbolFormat = (Text: string) => {
      const match = Text.match(/\d+/);
      if (match) {
        const number = match[0];
        return Text.slice(Text.indexOf(number));
      } else {
        return Text;
      }
    };
    // 过滤一下，只留下数字
    const pureMoneyText = doubleSymbolFormat(finalMoneyText);

    /**
     * 首字母判断是否是正负符号
     */
    const [operatorSymbol] = finalMoneyText || '';

    // 兼容正负号
    if (['+', '-'].includes(operatorSymbol)) {
      return `${moneySymbol || ''}${operatorSymbol}${pureMoneyText}`;
    }
    return `${moneySymbol || ''}${pureMoneyText}`;
  } catch (error) {
    return moneyText;
  }
};
