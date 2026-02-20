import { omit } from '@rc-component/util';
import { InputNumber } from 'antd';
import React, { useCallback } from 'react';
import { useIntl } from '../../../provider';
import { isNil } from '../../../utils';
import type { ProFieldFC } from '../../PureProField';

export type FieldDigitProps = {
  text: number;
  placeholder?: string;
};

/**
 * 数字组件
 *
 * @param text
 * @param type
 * @param render
 * @param placeholder
 * @param formItemRender
 * @param fieldProps
 * @param ref
 */
const FieldDigit: ProFieldFC<FieldDigitProps> = (
  { text, mode: type, render, placeholder, formItemRender, fieldProps },
  ref,
) => {
  const intl = useIntl();
  const placeholderValue =
    placeholder || intl.getMessage('tableForm.inputPlaceholder', '请输入');
  const proxyChange = useCallback(
    (value: number | string | null) => {
      let val = value ?? undefined;

      if (!fieldProps.stringMode && typeof val === 'string') {
        // 处理无效输入，如 '22.22.22'
        const numVal = Number(val);
        if (isNaN(numVal)) {
          // 如果转换失败，尝试提取第一个有效的数字
          const match = val.match(/^(\d+(?:\.\d+)?)/);
          if (match) {
            val = Number(match[1]);
          } else {
            val = undefined;
          }
        } else {
          val = numVal;
        }
      }
      if (
        typeof val === 'number' &&
        !isNil(val) &&
        !isNil(fieldProps.precision)
      ) {
        val = Number(val.toFixed(fieldProps.precision));
      }
      return val;
    },
    [fieldProps],
  );
  if (type === 'read') {
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

    // 如果是 string 模式，什么都不要处理了
    const dom = !fieldProps?.stringMode ? (
      <span ref={ref}>{fieldProps?.formatter?.(digit) || digit}</span>
    ) : (
      <span>{text}</span>
    );

    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  if (type === 'edit' || type === 'update') {
    const dom = (
      <InputNumber<number | string>
        ref={ref}
        min={0}
        placeholder={placeholderValue}
        {...omit(fieldProps, ['onChange', 'onBlur'])}
        onChange={(e) => fieldProps?.onChange?.(proxyChange(e))}
        onBlur={(e) => {
          const value = e.target.value;
          if (value === '') {
            fieldProps?.onBlur?.(e);
            return;
          }
          const processedValue = proxyChange(value);
          // 更新输入框的值
          if (e.target && typeof processedValue === 'number') {
            e.target.value = processedValue.toString();
            // 触发 onChange 事件以更新表单值
            fieldProps?.onChange?.(processedValue);
          }
          fieldProps?.onBlur?.(e);
        }}
      />
    );
    if (formItemRender) {
      return formItemRender(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldDigit);
