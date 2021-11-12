import React, { useMemo } from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber, Popover } from 'antd';
import { useIntl, intlMap as allIntlMap } from '@ant-design/pro-provider';
import type { ProFieldFC } from '../../index';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

export type FieldMoneyProps = {
  text: number;
  moneySymbol?: boolean;
  locale?: string;
  placeholder?: any;
  customSymbol?: string;
  /** 自定义 Popover 的值，false 可以关闭他 */
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
};

const getTextByLocale = (
  localeStr: string | false,
  paramsText: number | string,
  precision: number,
  config?: any,
) => {
  let moneyText = paramsText;
  if (typeof moneyText === 'string') {
    moneyText = Number(moneyText);
  }

  return new Intl.NumberFormat(localeStr || 'zh-Hans-CN', {
    ...(intlMap[localeStr || 'zh-Hans-CN'] || intlMap['zh-Hans-CN']),
    maximumFractionDigits: precision,
    ...config,
  }).format(moneyText);
};

const DefaultPrecisionCont = 2;

const InputNumberPopover = React.forwardRef<
  any,
  InputNumberProps & {
    content?: (props: InputNumberProps) => React.ReactNode;
  } & {
    numberFormatOptions?: any;
    numberPopoverRender?: any;
  }
>(({ content, numberFormatOptions, numberPopoverRender, ...rest }, ref) => {
  const [value, onChange] = useMergedState<any>(() => rest.defaultValue, {
    value: rest.value,
    onChange: rest.onChange,
  });
  const dom = content?.({
    ...rest,
    value,
  });
  return (
    <Popover placement="topLeft" visible={dom ? undefined : false} trigger="focus" content={dom}>
      <InputNumber ref={ref} {...rest} value={value} onChange={onChange} />
    </Popover>
  );
});

/**
 * 金额组件
 *
 * @param FieldMoneyProps {
 *     text: number;
 *     moneySymbol?: string; }
 */
const FieldMoney: ProFieldFC<FieldMoneyProps> = (
  {
    text,
    mode: type,
    locale = 'zh-Hans-CN',
    render,
    renderFormItem,
    fieldProps,
    proFieldKey,
    plain,
    valueEnum,
    placeholder,
    customSymbol,
    numberFormatOptions = fieldProps?.numberFormatOptions,
    numberPopoverRender = fieldProps?.numberPopoverRender || false,
    ...rest
  },
  ref,
) => {
  const precision = fieldProps?.precision ?? DefaultPrecisionCont;
  let intl = useIntl();
  // 当手动传入locale时，应该以传入的locale为准，未传入时则根据全局的locale进行国际化
  if (locale && allIntlMap[locale]) {
    intl = allIntlMap[locale];
  }
  const moneySymbol = useMemo(() => {
    if (customSymbol) {
      return customSymbol;
    }
    const defaultText = intl.getMessage('moneySymbol', '￥');
    if (rest.moneySymbol === false || fieldProps.moneySymbol === false) {
      return undefined;
    }
    return defaultText;
  }, [fieldProps.moneySymbol, intl, rest.moneySymbol, customSymbol]);

  if (type === 'read') {
    const dom = (
      <span ref={ref}>
        {getTextByLocale(moneySymbol ? locale : false, text, precision, numberFormatOptions)}
      </span>
    );
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }

  if (type === 'edit' || type === 'update') {
    const dom = (
      <InputNumberPopover
        content={(props) => {
          if (numberPopoverRender === false) return;
          if (!props.value) return;
          const reg = new RegExp(`/B(?=(d{${3 + (precision - DefaultPrecisionCont)}})+(?!d))/g`);
          const localeText = getTextByLocale(
            moneySymbol ? locale : false,
            props.value.toString().replace(reg, ','),
            precision,
            {
              ...numberFormatOptions,
              notation: 'compact',
            },
          );
          if (typeof numberPopoverRender === 'function') {
            return numberPopoverRender?.(props, localeText);
          }
          return localeText;
        }}
        ref={ref}
        precision={precision}
        // 删除默认min={0}，允许输入一个负数的金额，用户可自行配置min来限制是否允许小于0的金额
        formatter={(value) => {
          if (value) {
            const reg = new RegExp(`/B(?=(d{${3 + (precision - DefaultPrecisionCont)}})+(?!d))/g`);
            return `${moneySymbol} ${value}`.replace(reg, ',');
          }
          return '';
        }}
        parser={(value) =>
          value ? value.replace(new RegExp(`\\${moneySymbol}\\s?|(,*)`, 'g'), '') : ''
        }
        placeholder={placeholder}
        {...fieldProps}
      />
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldMoney);
