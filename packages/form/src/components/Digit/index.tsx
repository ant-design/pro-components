import React from 'react';
import { Form } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';
import ProField from '@ant-design/pro-field';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

type ProFormDigit = ProFormItemProps<InputNumberProps> & {
  min?: InputNumberProps['min'];
  max?: InputNumberProps['max'];
};
/**
 * 数组选择组件
 * @param
 */
const ProFormDigit: React.ForwardRefRenderFunction<any, ProFormDigit> = (
  { fieldProps, min, proFieldProps, max, ...restProps },
  ref,
) => {
  return (
    <Form.Item {...restProps}>
      <ProField
        mode="edit"
        valueType="digit"
        {...restProps}
        fieldProps={{
          min,
          max,
          ...fieldProps,
        }}
        ref={ref}
        {...proFieldProps}
      />
    </Form.Item>
  );
};

export default createField<ProFormDigit>(React.forwardRef(ProFormDigit));
