import { Input } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../types';
import type { FieldImageProps } from './types';

type Props = Parameters<ProFieldFC<FieldImageProps>>[0] & {
  placeholderValue: string;
};

export function FieldImageEdit(props: Props, ref: React.Ref<unknown>) {
  const {
    text,
    mode: type,
    formItemRender,
    fieldProps,
    placeholderValue,
  } = props;
  const dom = (
    <Input
      ref={ref as React.Ref<any>}
      placeholder={placeholderValue}
      {...fieldProps}
    />
  );
  if (formItemRender) {
    return formItemRender(text, { mode: type, ...fieldProps }, dom);
  }
  return dom;
}
