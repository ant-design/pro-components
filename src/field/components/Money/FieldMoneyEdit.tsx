import { omit } from '@rc-component/util';
import React from 'react';
import type { ProFieldFC } from '../../types';
import InputNumberPopover from './InputNumberPopover';
import { getTextByLocale } from './moneyFormat';
import type { FieldMoneyProps } from './types';

type Props = Omit<Parameters<ProFieldFC<FieldMoneyProps>>[0], 'moneySymbol'> & {
  precision: number;
  placeholderValue: string;
  moneySymbol: string | undefined;
  numberPopoverRender: FieldMoneyProps['numberPopoverRender'];
  numberFormatOptions: FieldMoneyProps['numberFormatOptions'];
  getFormateValue: (value?: string | number) => string;
};

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
  } = props;

  const dom = (
    <InputNumberPopover
      contentRender={(p) => {
        if (numberPopoverRender === false) return null;
        if (!p.value) return null;
        const localeText = getTextByLocale(
          moneySymbol || locale || false,
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
          return `${moneySymbol} ${getFormateValue(value)}`;
        }
        return value?.toString() || (value as string);
      }}
      parser={(value) => {
        if (moneySymbol && value) {
          return value.replace(
            new RegExp(`\\${moneySymbol}\\s?|(,*)`, 'g'),
            '',
          );
        }
        return value!;
      }}
      placeholder={placeholderValue}
      {...omit(fieldProps, [
        'numberFormatOptions',
        'precision',
        'numberPopoverRender',
        'customSymbol',
        'moneySymbol',
        'visible',
        'open',
      ])}
      onBlur={
        fieldProps.onBlur
          ? (e) => {
              let value = e.target.value;
              if (moneySymbol && value) {
                value = value.replace(
                  new RegExp(`\\${moneySymbol}\\s?|(,*)`, 'g'),
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
