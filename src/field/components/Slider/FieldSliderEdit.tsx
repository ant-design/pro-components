import { Slider } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../types';

export function FieldSliderEdit(
  props: Parameters<ProFieldFC<{ text: string }>>[0],
  ref: React.Ref<unknown>,
) {
  const { text, mode, formItemRender, fieldProps } = props;
  const dom = (
    <Slider
      ref={ref as React.Ref<any>}
      {...fieldProps}
      style={{
        minWidth: 120,
        ...fieldProps?.style,
      }}
    />
  );
  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, dom);
  }
  return dom;
}
