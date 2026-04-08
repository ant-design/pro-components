import { omit } from '@rc-component/util';
import { InputNumber } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../types';
import { isEmptyOrWhitespace } from './digitUtils';
import type { FieldDigitProps } from './types';

type Props = Parameters<ProFieldFC<FieldDigitProps>>[0] & {
  placeholderValue: string;
  proxyChange: (value: number | string | null) => number | string | undefined;
};

export function FieldDigitEdit(props: Props, ref: React.Ref<unknown>) {
  const {
    text,
    mode: type,
    formItemRender,
    fieldProps,
    placeholderValue,
    proxyChange,
  } = props;
  const dom = (
    <InputNumber<number | string>
      ref={ref as React.Ref<any>}
      min={0}
      placeholder={placeholderValue}
      {...omit(fieldProps, ['onChange', 'onBlur'])}
      onChange={(e) => fieldProps?.onChange?.(proxyChange(e))}
      onBlur={(e) => {
        const value = e.target.value;
        if (isEmptyOrWhitespace(value)) {
          fieldProps?.onBlur?.(e);
          return;
        }
        const processedValue = proxyChange(value);
        if (e.target && typeof processedValue === 'number') {
          e.target.value = processedValue.toString();
          fieldProps?.onChange?.(processedValue);
        }
        fieldProps?.onBlur?.(e);
      }}
    />
  );
  if (formItemRender) {
    return formItemRender(text, { mode: type, ...fieldProps }, dom);
  }
  return dom;
}
