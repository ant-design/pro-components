import { omit } from '@rc-component/util';
import React from 'react';
import type { ProFieldFC } from '../../types';
import InputNumberPopover from './InputNumberPopover';
import {
  getTextByLocale,
  splitSuffixSpacing,
  type LocaleMoneyMeta,
} from './moneyFormat';
import type { FieldMoneyProps } from './types';

type Props = Omit<Parameters<ProFieldFC<FieldMoneyProps>>[0], 'moneySymbol'> & {
  precision: number;
  placeholderValue: string;
  moneySymbol: string | undefined;
  numberPopoverRender: FieldMoneyProps['numberPopoverRender'];
  numberFormatOptions: FieldMoneyProps['numberFormatOptions'];
  getFormateValue: (value?: string | number) => string;
  /** locale 数字分隔符与货币符号位置（由 FieldMoney 统一计算，避免在直接函数调用中挂 hooks） */
  localeMeta: LocaleMoneyMeta;
};

const escapeRegExp = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function FieldMoneyEdit(props: Props, ref: React.Ref<unknown>) {
  const {
    text,
    mode: type,
    formItemRender,
    fieldProps,
    locale,
    precision,
    placeholderValue,
    moneySymbol,
    numberPopoverRender,
    numberFormatOptions,
    getFormateValue,
    localeMeta,
  } = props;

  const { groupSeparator, decimalSeparator, suffixAffix } = localeMeta;
  const suffixSpacing = splitSuffixSpacing(suffixAffix).spacing;

  const dom = (
    <InputNumberPopover
      contentRender={(p) => {
        if (numberPopoverRender === false) return null;
        if (!p.value) return null;
        const localeText = getTextByLocale(
          locale || false,
          `${getFormateValue(p.value)}`,
          precision,
          {
            ...numberFormatOptions,
            notation: 'compact',
          },
          moneySymbol,
        );

        if (typeof numberPopoverRender === 'function') {
          return numberPopoverRender?.(
            p,
            String(localeText),
          ) as React.ReactNode;
        }
        return localeText;
      }}
      ref={ref as React.Ref<any>}
      precision={precision}
      formatter={(value) => {
        if (value && moneySymbol) {
          const formattedNumber = getFormateValue(value)
            // eslint-disable-next-line no-control-regex -- \u0001 作为占位符避免组/小数分隔符冲突
            .replace(/,/g, '\u0001')
            .replace(/\./g, decimalSeparator)
            // eslint-disable-next-line no-control-regex -- 同上
            .replace(/\u0001/g, groupSeparator);
          if (suffixAffix) {
            return `${formattedNumber}${suffixSpacing}${moneySymbol}`;
          }
          return `${moneySymbol} ${formattedNumber}`;
        }
        return value?.toString() || (value as string);
      }}
      parser={(value) => {
        if (moneySymbol && value) {
          return value.replace(
            new RegExp(
              `${escapeRegExp(moneySymbol)}\\s?|(${escapeRegExp(
                groupSeparator,
              )}*)`,
              'g',
            ),
            '',
          );
        }
        return value!;
      }}
      decimalSeparator={decimalSeparator === '.' ? undefined : decimalSeparator}
      placeholder={placeholderValue}
      {...omit(fieldProps, [
        'numberFormatOptions',
        'precision',
        'numberPopoverRender',
        'customSymbol',
        'moneySymbol',
        'visible',
        'open',
        'locale',
      ])}
      onBlur={
        fieldProps.onBlur
          ? (e) => {
              let value = e.target.value;
              if (moneySymbol && value) {
                value = value.replace(
                  new RegExp(
                    `${escapeRegExp(moneySymbol)}\\s?|(${escapeRegExp(
                      groupSeparator,
                    )}*)`,
                    'g',
                  ),
                  '',
                );
              }
              fieldProps.onBlur?.(value);
            }
          : undefined
      }
    />
  );

  if (formItemRender) {
    return formItemRender(text, { mode: type, ...fieldProps }, dom);
  }
  return dom;
}
