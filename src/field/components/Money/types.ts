import type { InputNumberProps } from 'antd';

export type FieldMoneyProps = {
  text: number;
  moneySymbol?: boolean;
  locale?: string;
  /**
   * 输入框内容为空的提示内容
   */
  placeholder?: string;
  /**
   * 自定义 money 的 Symbol
   */
  customSymbol?: string;
  /**
   * 自定义 Popover 的值，false 可以关闭他
   */
  numberPopoverRender?:
    | ((props: InputNumberProps, defaultText: string) => React.ReactNode)
    | boolean;
  /**
   * NumberFormat 的配置，文档可以查看 mdn
   *
   * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
   */
  numberFormatOptions?: {
    localeMatcher?: string;
    style?: string;
    currency?: string;
    currencyDisplay?: string;
    currencySign?: string;
    useGrouping?: boolean;
    minimumIntegerDigits?: number;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    minimumSignificantDigits?: number;
    maximumSignificantDigits?: number;
  };
};
