import { Rate } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../types';

export function FieldRateRead(
  props: Parameters<ProFieldFC<{ text: string }>>[0],
  ref: React.Ref<unknown>,
) {
  const { text, mode, render, fieldProps } = props;
  const dom = (
    <Rate
      allowHalf
      disabled
      ref={ref as React.Ref<any>}
      {...fieldProps}
      value={text}
    />
  );
  if (render) {
    return render(text, { mode, ...fieldProps }, <>{dom}</>);
  }
  return dom;
}
