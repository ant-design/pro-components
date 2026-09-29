import React from 'react';
import type { ProFieldFC } from '../../types';
import type { FieldDigitProps } from './types';

export function FieldDigitRead(
  props: Parameters<ProFieldFC<FieldDigitProps>>[0],
  ref: React.Ref<unknown>,
) {
  const { text, mode: type, render, fieldProps } = props;
  let fractionDigits = {} as Record<string, any> as any;
  if (fieldProps?.precision) {
    fractionDigits = {
      minimumFractionDigits: Number(fieldProps.precision),
      maximumFractionDigits: Number(fieldProps.precision),
    };
  }
  const digit = new Intl.NumberFormat(undefined, {
    ...fractionDigits,
    ...(fieldProps?.intlProps || {}),
  }).format(Number(text) as number);

  const dom = !fieldProps?.stringMode ? (
    <span ref={ref as React.Ref<HTMLSpanElement>}>
      {/* #8844 只读模式渲染 prefix/suffix,与编辑态 InputNumber 展示对齐 */}
      {fieldProps?.prefix}
      {fieldProps?.formatter?.(digit) || digit}
      {fieldProps?.suffix}
    </span>
  ) : (
    <span>{text}</span>
  );

  if (render) {
    return render(text, { mode: type, ...fieldProps }, dom);
  }
  return dom;
}
