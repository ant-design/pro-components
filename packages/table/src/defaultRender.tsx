import React from 'react';
import ProField, {
  ProFieldEmptyText,
  ProFieldValueType,
  ProFieldValueObjectType,
} from '@ant-design/pro-field';
import { ProColumnType } from './index';

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
  props?: ProColumnType<T>,
): React.ReactNode => {
  // 如果 valueType === text ，没必要多走一次 render
  if ((!valueType || valueType === 'text') && !props?.valueEnum) {
    return text;
  }

  if (typeof valueType === 'function' && item) {
    const value = valueType(item);
    if (!value) {
      return columnEmptyText;
    }
    return defaultRenderText(text, value as ProFieldValueType, index, props);
  }

  return (
    <ProField
      {...props}
      text={valueType === 'index' || valueType === 'indexBorder' ? index : text}
      mode="read"
      columnEmptyText={columnEmptyText}
      render={undefined}
      renderFormItem={undefined}
      valueType={valueType as ProFieldValueType}
    />
  );
};

export default defaultRenderText;
