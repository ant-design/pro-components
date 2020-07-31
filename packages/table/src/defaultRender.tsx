import React from 'react';
import ProField, {
  ProFieldEmptyText,
  ProFieldValueType,
  ProFieldValueObjectType,
} from '@ant-design/pro-field';

/**
 * value type by function
 */
export type ProColumnsValueTypeFunction<T> = (
  item: T,
) => ProFieldValueType | ProFieldValueObjectType;

/**
 * 根据不同的类型来转化数值
 * @param text
 * @param valueType
 */
const defaultRenderText = <T, U = any>(
  text: string | number | React.ReactText[],
  valueType: ProFieldValueType | ProColumnsValueTypeFunction<T>,
  index: number,
  item?: T,
  columnEmptyText?: ProFieldEmptyText,
): React.ReactNode => {
  if (typeof valueType === 'function' && item) {
    const value = valueType(item);
    if (!value) {
      return columnEmptyText;
    }
    return defaultRenderText(text, value as ProFieldValueType, index);
  }
  return (
    <ProField
      text={text || index}
      mode="read"
      columnEmptyText={columnEmptyText}
      valueType={valueType as ProFieldValueType}
    />
  );
};

export default defaultRenderText;
