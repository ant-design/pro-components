import React, { useMemo, useCallback } from 'react';
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
});

const enMoneyIntl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const ruMoneyIntl = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});

const rsMoneyIntl = new Intl.NumberFormat('sr-RS', {
  style: 'currency',
  currency: 'RSD',
});

const msMoneyIntl = new Intl.NumberFormat('ms-MY', {
  style: 'currency',
  currency: 'MYR',
});

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
    locale = '',
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
    rest.moneySymbol === undefined ? intl.getMessage('moneySymbol', '￥') : rest.moneySymbol;

  const intlMap = useMemo(() => {
    const moneyIntl = new Intl.NumberFormat('zh-Hans-CN', {
      currency: 'CNY',
      style: 'currency',
      minimumFractionDigits: precision,
    });

    return {
      default: defaultMoneyIntl,
      'zh-Hans-CN': moneyIntl,
      'en-US': enMoneyIntl,
      'ru-RU': ruMoneyIntl,
      'ms-MY': msMoneyIntl,
      'sr-RS': rsMoneyIntl,
    };
  }, [precision]);

  const getTextByLocale = useCallback(
    (localeStr: string | undefined, paramsText: number) => {
      let moneyText = paramsText;
      if (typeof moneyText === 'string') {
        moneyText = Number(moneyText);
      }
      if (localeStr === 'en_US') {
        // english
        return intlMap['en-US'].format(moneyText);
      }
      // russian
      if (localeStr === 'ru_RU') {
        return intlMap['ru-RU'].format(moneyText);
      }
      // serbian
      if (localeStr === 'sr_RS') {
        return intlMap['sr-RS'].format(moneyText);
      }
      // malay
      if (localeStr === 'ms_MY') {
        return intlMap['ms-MY'].format(moneyText);
      }
      if (localeStr === undefined) {
        return intlMap.default.format(moneyText);
      }
      return intlMap['zh-Hans-CN'].format(moneyText);
    },
    [intlMap],
  );

  if (type === 'read') {
    const dom = (
      <span ref={ref}>
        {getTextByLocale(moneySymbol ? locale || intl.locale || 'zh-CN' : undefined, text)}
      </span>
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
