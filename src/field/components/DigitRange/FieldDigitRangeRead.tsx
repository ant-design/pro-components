import React from 'react';
import type { ProFieldFC } from '../../types';
import type { FieldDigitRangeProps, Value } from './types';

export function FieldDigitRangeRead(
  props: Parameters<ProFieldFC<FieldDigitRangeProps>>[0],
  ref: React.Ref<unknown>,
) {
  const { text, mode: type, render, fieldProps, separator = '~' } = props;
  const getContent = (number: Value) => {
    const digit = new Intl.NumberFormat(undefined, {
      minimumSignificantDigits: 2,
      ...(fieldProps?.intlProps || {}),
    }).format(Number(number) as number);

    return fieldProps?.formatter?.(digit) || digit;
  };
  const dom = (
    <span ref={ref as React.Ref<HTMLSpanElement>}>
      {getContent(text[0])} {separator} {getContent(text[1])}
    </span>
  );
  if (render) {
    return render(text, { mode: type, ...fieldProps }, dom);
  }
  return dom;
}
