import { Input, InputNumber, Space } from 'antd';
import React, { MutableRefObject } from 'react';
import type { ProFieldFC } from '../../types';
import type { FieldDigitRangeProps, Value, ValuePair } from './types';

type Props = Parameters<ProFieldFC<FieldDigitRangeProps>>[0] & {
  valuePair: ValuePair | undefined;
  valuePairRef: MutableRefObject<ValuePair | undefined>;
  setValuePair: (
    updater:
      | ValuePair
      | undefined
      | ((prev: ValuePair | undefined) => ValuePair | undefined),
  ) => void;
  token: { colorBgContainer?: string };
  placeholderValue: string | string[];
};

export function FieldDigitRangeEdit(props: Props, ref: React.Ref<unknown>) {
  const {
    text,
    mode: type,
    formItemRender,
    fieldProps,
    separator = '~',
    separatorWidth = 30,
    valuePair,
    valuePairRef,
    setValuePair,
    token,
    placeholderValue,
  } = props;
  const { value, defaultValue, onChange, id } = fieldProps;

  const handleGroupBlur = () => {
    if (Array.isArray(valuePairRef.current)) {
      const [value0, value1] = valuePairRef.current;
      if (
        typeof value0 === 'number' &&
        typeof value1 === 'number' &&
        value0 > value1
      ) {
        setValuePair([value1, value0]);
        return;
      }

      if (value0 === undefined && value1 === undefined) {
        setValuePair(undefined);
      }
    }
  };

  const handleChange = (index: number, changedValue: Value) => {
    const newValuePair = [...(valuePair || [])];
    newValuePair[index] = changedValue === null ? undefined : changedValue;
    valuePairRef.current = newValuePair;
    setValuePair(newValuePair);
  };

  const getInputNumberPlaceholder = (index: number) =>
    Array.isArray(placeholderValue)
      ? placeholderValue[index]
      : placeholderValue;

  const dom = (
    <Space.Compact block onBlur={handleGroupBlur}>
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
    </Space.Compact>
  );
  if (formItemRender) {
    return formItemRender(text, { mode: type, ...fieldProps }, dom);
  }
  return dom;
}
