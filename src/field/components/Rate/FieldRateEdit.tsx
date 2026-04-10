import { Rate } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../types';

export function FieldRateEdit(
  props: Parameters<ProFieldFC<{ text: string }>>[0],
  ref: React.Ref<unknown>,
) {
  const { text, mode, formItemRender, fieldProps } = props;
  const dom = <Rate allowHalf ref={ref as React.Ref<any>} {...fieldProps} />;
  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, dom);
  }
  return dom;
}
