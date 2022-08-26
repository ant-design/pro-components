import { InputNumber } from 'antd';
import omit from 'lodash.omit';
import React, { useCallback } from 'react';
import type { ProFieldFC } from '../../index';

// 兼容代码-----------
import 'antd/es/input-number/style';
//----------------------

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
  const proxyChange = useCallback(
    (value: number) => {
      const val = Number(value?.toFixed(fieldProps.precision ?? 0));
      return fieldProps?.onChange(val);
    },
    [fieldProps],
  );
  if (type === 'read') {
    let fractionDigits = {} as any;
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
    const dom = <span ref={ref}>{fieldProps?.formatter?.(digit) || digit}</span>;
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
        placeholder={placeholder}
        {...omit(fieldProps, 'onChange')}
        onChange={proxyChange}
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
