import React from 'react';
import { InputNumber, Checkbox, Switch } from 'antd';
import { ProFieldFC } from '../../index';

export type FieldBooleanProps = {
  text: string;
};

/**
 * 数字组件
 * @param FieldBooleanProps
 * {
 *    text: number;
 *    moneySymbol?: string;
 * }
 */
const FieldBoolean: ProFieldFC<FieldBooleanProps> = (
  { text, mode: type, render, renderFormItem, fieldProps, ...rest },
  ref,
) => {
  if (type === 'read') {
    const dom = <Checkbox defaultChecked={fieldProps.checked} disabled></Checkbox>;
    console.log({ fieldProps });
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  if (type === 'edit' || type === 'update') {
    const dom = <Switch ref={ref} {...rest} {...fieldProps} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldBoolean);
