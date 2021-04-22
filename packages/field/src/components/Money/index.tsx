import React from 'react';
import { InputNumber } from 'antd';
import { useIntl } from '@ant-design/pro-provider';
import type { ProFieldFC } from '../../index';

export type FieldMoneyProps = {
  text: number;
  moneySymbol?: string;
  locale?: string;
  placeholder?: any;
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

const getTextByLocale = (localeStr: string | false, paramsText: number, precision: number) => {
  let moneyText = paramsText;
  if (typeof moneyText === 'string') {
    moneyText = Number(moneyText);
  }
  if (!localeStr) {
    return new Intl.NumberFormat().format(moneyText);
  }

  return new Intl.NumberFormat(localeStr, {
    ...(intlMap[localeStr || 'zh-Hans-CN'] || intlMap['zh-Hans-CN']),
    minimumFractionDigits: precision,
  }).format(moneyText);
};

const DefaultPrecisionCont = 2;

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
    ...rest
  },
  ref,
) => {
  const precision = fieldProps?.precision ?? DefaultPrecisionCont;
  const intl = useIntl();
  const moneySymbol =
    fieldProps.moneySymbol === undefined || fieldProps.moneySymbol || rest.moneySymbol
      ? intl.getMessage('moneySymbol', '￥')
      : undefined;

  if (type === 'read') {
    const dom = (
      <span ref={ref}>{getTextByLocale(moneySymbol ? locale : false, text, precision)}</span>
    );
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }

  if (type === 'edit' || type === 'update') {
    const dom = (
      <InputNumber
        ref={ref}
        min={0}
        precision={precision}
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
        style={{
          width: '100%',
        }}
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
