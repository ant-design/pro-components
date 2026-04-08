import React from 'react';
import type { ProFieldFC } from '../../types';
import type { FieldSecondProps } from './types';
import { formatSecond } from './utils';

export function FieldSecondRead(
  props: Parameters<ProFieldFC<FieldSecondProps>>[0],
  ref: React.Ref<unknown>,
) {
  const { text, mode: type, render, fieldProps } = props;
  const secondText = formatSecond(Number(text) as number);
  const dom = <span ref={ref as React.Ref<HTMLSpanElement>}>{secondText}</span>;
  if (render) {
    return render(text, { mode: type, ...fieldProps }, dom);
  }
  return dom;
}
