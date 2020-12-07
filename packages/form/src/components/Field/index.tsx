import React from 'react';

import ProField, { ProFieldValueType } from '@ant-design/pro-field';
import { InputProps } from 'antd/lib/input';
import { SelectProps } from 'antd/lib/select';
import { ProSchema } from '@ant-design/pro-utils';

import createField from '../../BaseForm/createField';
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
const ProFormField = React.forwardRef<
  any,
  ProFormFieldProps & {
    onChange?: Function;
  }
>(
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
      onChange,
      ...restProps
    },
    ref,
  ) => {
    // 防止 formItem 的值被吃掉
    if (children) {
      if (React.isValidElement(children)) {
        return React.cloneElement(children, {
          ...restProps,
          onChange: (...restParams: any) => {
            (fieldProps?.onChange as any)?.(...restParams);
            onChange?.(...restParams);
          },
          ...children.props,
        });
      }
      return children as JSX.Element;
    }
    return (
      <ProField
        text={fieldProps?.value as string}
        mode="edit"
        valueType={(valueType as 'text') || 'text'}
        fieldProps={{
          ...fieldProps,
          onChange: (...restParams: any) => {
            (fieldProps?.onChange as any)?.(...restParams);
            onChange?.(...restParams);
          },
        }}
        {...proFieldProps}
        {...restProps}
        ref={ref}
      />
    );
  },
);

export default createField<ProFormFieldProps>(ProFormField);
