import { useIntl } from '@ant-design/pro-provider';
import { isNil } from '@ant-design/pro-utils';
import { InputNumber } from 'antd';
import omit from 'rc-util/lib/omit';
import React, { useCallback } from 'react';
import type { ProFieldFC } from '../../PureProField';

export type FieldDigitProps = {
  text: number;
  placeholder?: string;
};

/**
 * 数字组件
 *
 * @param FieldDigitProps {
 *     text: number;
 *     moneySymbol?: string; }
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
        val = Number(val);
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
        onBlur={(e) => fieldProps?.onBlur?.(proxyChange(e.target.value))}
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
