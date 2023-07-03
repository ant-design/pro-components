import { proTheme, useIntl } from '@ant-design/pro-provider';
import { Input, InputNumber } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React from 'react';
import type { ProFieldFC } from '../../index';

// 兼容代码-----------
import 'antd/lib/input-number/style';
//----------------------

export type Value = string | number | undefined | null;

export type ValuePair = Value[];

export type FieldDigitRangeProps = {
  text: ValuePair;
  placeholder?: string | string[];
  separator?: string;
  separatorWidth?: number;
};

/**
 * 数字范围组件
 *
 * @param FieldDigitRangeProps
 */
const FieldDigitRange: ProFieldFC<FieldDigitRangeProps> = (
  {
    text,
    mode: type,
    render,
    placeholder,
    renderFormItem,
    fieldProps,
    separator = '~',
    separatorWidth = 30,
  },
  ref,
) => {
  const { value, defaultValue, onChange, id } = fieldProps;
  const intl = useIntl();

  const { token } = proTheme.useToken();
  const [valuePair, setValuePair] = useMergedState(() => defaultValue, {
    value: value,
    onChange: onChange,
  });

  if (type === 'read') {
    const getContent = (number: Value) => {
      const digit = new Intl.NumberFormat(undefined, {
        minimumSignificantDigits: 2,
        ...(fieldProps?.intlProps || {}),
      }).format(Number(number) as number);

      return fieldProps?.formatter?.(digit) || digit;
    };
    const dom = (
      <span ref={ref}>
        {getContent(text[0])} {separator} {getContent(text[1])}
      </span>
    );
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }

  if (type === 'edit' || type === 'update') {
    const handleGroupBlur = () => {
      if (Array.isArray(valuePair)) {
        //   仅在两个值均为数字时才做比较并转换
        const [value0, value1] = valuePair;
        if (
          typeof value0 === 'number' &&
          typeof value1 === 'number' &&
          value0 > value1
        ) {
          setValuePair([value1, value0]);
        } else if (value0 === undefined && value1 === undefined) {
          // 当两个值均为undefined时将值变为undefined，方便required处理
          setValuePair(undefined);
        }
      }
    };

    const handleChange = (index: number, changedValue: Value) => {
      const newValuePair = [...(valuePair || [])];
      newValuePair[index] = changedValue === null ? undefined : changedValue;
      setValuePair(newValuePair);
    };
    const placeholderValue = fieldProps?.placeholder ||
      placeholder || [
        intl.getMessage('tableForm.inputPlaceholder', '请输入'),
        intl.getMessage('tableForm.inputPlaceholder', '请输入'),
      ];

    const getInputNumberPlaceholder = (index: number) =>
      Array.isArray(placeholderValue)
        ? placeholderValue[index]
        : placeholderValue;

    const dom = (
      <Input.Group compact onBlur={handleGroupBlur}>
        <InputNumber<number>
          {...fieldProps}
          placeholder={getInputNumberPlaceholder(0)}
          id={id ?? `${id}-0`}
          style={{ width: `calc((100% - ${separatorWidth}px) / 2)` }}
          value={valuePair?.[0]}
          defaultValue={defaultValue?.[0]}
          onChange={(changedValue) => handleChange(0, changedValue)}
        />
        <Input
          style={{
            width: separatorWidth,
            textAlign: 'center',
            borderInlineStart: 0,
            borderInlineEnd: 0,
            pointerEvents: 'none',
            backgroundColor: token?.colorBgContainer,
          }}
          placeholder={separator}
          disabled
        />
        <InputNumber<number>
          {...fieldProps}
          placeholder={getInputNumberPlaceholder(1)}
          id={id ?? `${id}-1`}
          style={{
            width: `calc((100% - ${separatorWidth}px) / 2)`,
            borderInlineStart: 0,
          }}
          value={valuePair?.[1]}
          defaultValue={defaultValue?.[1]}
          onChange={(changedValue) => handleChange(1, changedValue)}
        />
      </Input.Group>
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldDigitRange);
