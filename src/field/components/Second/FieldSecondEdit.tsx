import { InputNumber } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../types';
import type { FieldSecondProps } from './types';

type Props = Parameters<ProFieldFC<FieldSecondProps>>[0] & {
  placeholderValue: string;
};

export function FieldSecondEdit(props: Props, ref: React.Ref<unknown>) {
  const {
    text,
    mode: type,
    formItemRender,
    fieldProps,
    placeholderValue,
  } = props;
  const dom = (
    <InputNumber
      ref={ref as React.Ref<any>}
      min={0}
      style={{
        width: '100%',
      }}
      placeholder={placeholderValue}
      {...fieldProps}
    />
  );
  if (formItemRender) {
    return formItemRender(text, { mode: type, ...fieldProps }, dom);
  }
  return dom;
}
