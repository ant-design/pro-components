import React from 'react';
import { InputNumber } from 'antd';
import type { ProFieldFC } from '../../index';

export type FieldDigitProps = {
  text: number;
};

/**
 * 格式化秒
 *
 * @param result
 * @returns {string}
 */
export function formatSecond(result: number) {
  let formatText = '';
  const h = Math.floor(result / 3600);
  const m = Math.floor((result / 60) % 60);
  const s = Math.floor(result % 60);
  formatText = `${s}秒`;
  if (m > 0) {
    formatText = `${m}分钟${formatText}`;
  }
  if (h > 0) {
    formatText = `${h}小时${formatText}`;
  }
  return formatText;
}

/**
 * 格式化秒
 *
 * @param FieldSecond
 */
const Second: ProFieldFC<FieldDigitProps> = (
  { text, mode: type, render, renderFormItem, fieldProps, ...rest },
  ref,
) => {
  if (type === 'read') {
    const secondText = formatSecond(Number(text) as number);
    const dom = <span ref={ref}>{secondText}</span>;
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

export default React.forwardRef(Second);
