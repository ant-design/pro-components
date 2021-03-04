import React, { useMemo, useCallback } from 'react';
import { InputNumber } from 'antd';
import { useIntl } from '@ant-design/pro-provider';
import type { ProFieldFC } from '../../index';

export type FieldMoneyProps = {
  text: number;
  moneySymbol?: string;
  locale?: string;
  precision?: number;
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
    precision = DefaultPrecisionCont,
    ...rest
  },
  ref,
) => {
  const intl = useIntl();
  const moneySymbol =
    rest.moneySymbol === undefined ? intl.getMessage('moneySymbol', '￥') : rest.moneySymbol;

  const intls = useMemo(() => {
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
    };
  }, [precision]);

  const getTextByLocale = useCallback(
    (locale: string | undefined, paramsText: number) => {
      let text = paramsText;
      if (typeof text === 'string') {
        text = Number(text);
      }
      if (locale === 'en_US') {
        // english
        return intls['en-US'].format(text);
      }
      // russian
      if (locale === 'ru_RU') {
        return intls['ru-RU'].format(text);
      }
      // malay
      if (locale === 'ms_MY') {
        return intls['ms-MY'].format(text);
      }
      if (locale === undefined) {
        return intls.default.format(text);
      }
      return intls['zh-Hans-CN'].format(text);
    },
    [intls],
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
        {...rest}
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
