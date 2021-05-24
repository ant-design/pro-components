import React from 'react';
import { InputNumber } from 'antd';
import type { ProFieldFC } from '../../index';

export type FieldDigitProps = {
  text: number;
  placeholder?: any;
};

/**
 * 数字组件
 *
 * @param FieldDigitProps {
 *     text: number;
 *     moneySymbol?: string; }
 */
const FieldDigit: ProFieldFC<FieldDigitProps> = (
  { text, mode: type, render, placeholder, renderFormItem, fieldProps },
  ref,
) => {
  if (type === 'read') {
    const digit = new Intl.NumberFormat(undefined, fieldProps?.intlProps).format(
      Number(text) as number,
    );
    const dom = <span ref={ref}>{fieldProps?.formatter?.(digit) || digit}</span>;
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  if (type === 'edit' || type === 'update') {
    const dom = <InputNumber ref={ref} min={0} placeholder={placeholder} {...fieldProps} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldDigit);
