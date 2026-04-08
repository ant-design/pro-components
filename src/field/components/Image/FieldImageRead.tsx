import { Image } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../types';
import type { FieldImageProps } from './types';

export function FieldImageRead(
  props: Parameters<ProFieldFC<FieldImageProps>>[0],
  ref: React.Ref<unknown>,
) {
  const { text, mode: type, render, fieldProps, width } = props;
  const dom = (
    <Image
      ref={ref as React.Ref<any>}
      width={width || 32}
      src={text}
      {...fieldProps}
    />
  );
  if (render) {
    return render(text, { mode: type, ...fieldProps }, dom);
  }
  return dom;
}
