import React from 'react';

import ProField, { ProFieldValueType } from '@ant-design/pro-field';
import { Form } from 'antd';
import { InputProps } from 'antd/lib/input';
import { SelectProps } from 'antd/lib/select';
import { ProSchema, pickProProps } from '@ant-design/pro-utils';

import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

export type ProFormFieldProps = ProSchema<
  string,
  ProFieldValueType,
  ProFormItemProps<InputProps & SelectProps<string>> & {
    // 用来判断是不是被嵌套渲染的 dom
    isDefaultDom?: boolean;
    ref?: any;
  }
>;
/**
 * 最普通的 Text 组件
 * @param
 */
const ProFormField = React.forwardRef<any, ProFormFieldProps>(
  (
    {
      fieldProps,
      children,
      labelCol,
      label,
      isDefaultDom,
      render,
      proFieldProps,
      renderFormItem,
      valueType,
      initialValue,
      ...restProps
    },
    ref,
  ) => (
    <Form.Item
      label={label}
      labelCol={labelCol}
      initialValue={initialValue}
      {...pickProProps(restProps)}
    >
      {children || (
        <ProField
          text={fieldProps?.value as string}
          mode="edit"
          valueType={(valueType as 'text') || 'text'}
          fieldProps={fieldProps}
          {...proFieldProps}
          {...restProps}
          ref={ref}
        />
      )}
    </Form.Item>
  ),
);

// @ts-ignore
ProFormField.type = 'ProField';

export default createField<ProFormFieldProps>(ProFormField);
