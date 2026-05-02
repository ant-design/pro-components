import { InputNumber } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../types';
import type { FieldDigitProps } from './types';

type Props = Parameters<ProFieldFC<FieldDigitProps>>[0] & {
  placeholderValue: string;
};

export function FieldDigitEdit(props: Props, ref: React.Ref<unknown>) {
  const {
    text,
    mode: type,
    formItemRender,
    fieldProps,
    placeholderValue,
  } = props;
  const dom = (
    <InputNumber
      ref={ref}
      min={0}
      placeholder={placeholderValue}
      {...fieldProps}
    />
  );
  if (formItemRender) {
    return formItemRender(text, { mode: type, ...fieldProps }, dom);
  }
  return dom;
}
