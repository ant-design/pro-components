import React from 'react';
import { InputNumber } from 'antd';
import { ProFieldFC } from '../../index';

export type FieldDigitProps = {
  text: number;
};

/**
 * 数字组件
 * @param FieldDigitProps
 * {
 *    text: number;
 *    moneySymbol?: string;
 * }
 */
const FieldDigit: ProFieldFC<FieldDigitProps> = (
  { text, mode: type, render, renderFormItem, fieldProps, ...rest },
  ref,
) => {
  if (type === 'read') {
    const digit = new Intl.NumberFormat().format(Number(text) as number);
    const dom = <span ref={ref}>{digit}</span>;
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  if (type === 'edit' || type === 'update') {
    const dom = (
      <InputNumber
        ref={ref}
        min={0}
        precision={2}
        style={{
          width: '100%',
        }}
        {...rest}
        {...fieldProps}
      />
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldDigit);
