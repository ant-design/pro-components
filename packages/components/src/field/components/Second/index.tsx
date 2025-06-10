import { useIntl } from '@ant-design/pro-provider';
import { InputNumber } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../PureProField';

export type FieldDigitProps = {
  text: number;
  placeholder?: string;
};

/**
 * 格式化秒
 *
 * @param result
 * @returns {string}
 */
export function formatSecond(result: number) {
  let newResult = result;
  let formatText = '';
  let past = false;
  if (newResult < 0) {
    newResult = -newResult;
    past = true;
  }
  const d = Math.floor(newResult / (3600 * 24));
  const h = Math.floor((newResult / 3600) % 24);
  const m = Math.floor((newResult / 60) % 60);
  const s = Math.floor(newResult % 60);
  formatText = `${s}秒`;
  if (m > 0) {
    formatText = `${m}分钟${formatText}`;
  }
  if (h > 0) {
    formatText = `${h}小时${formatText}`;
  }
  if (d > 0) {
    formatText = `${d}天${formatText}`;
  }
  if (past) {
    formatText += '前';
  }
  return formatText;
}

/**
 * 格式化秒
 *
 * @param FieldSecond
 */
const Second: ProFieldFC<FieldDigitProps> = (
  { text, mode: type, render, formItemRender, fieldProps, placeholder },
  ref,
) => {
  const intl = useIntl();
  const placeholderValue =
    placeholder || intl.getMessage('tableForm.inputPlaceholder', '请输入');
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
        placeholder={placeholderValue}
        {...fieldProps}
      />
    );
    if (formItemRender) {
      return formItemRender(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(Second);
