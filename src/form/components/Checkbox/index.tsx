import { omit } from '@rc-component/util';
import type { CheckboxProps, CheckboxRef } from 'antd';
import { Checkbox } from 'antd';
import type { CheckboxGroupProps } from 'antd/lib/checkbox';
import React from 'react';
import { FieldCheckbox } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import { runFunction } from '../../../utils';
import type {
  ProFormFieldItemProps,
  ProFormFieldRemoteProps,
} from '../../typing';
import ProFormField from '../Field';
import warpField from '../FormItem/warpField';

export type ProFormCheckboxGroupProps = ProFormFieldItemProps<
  CheckboxGroupProps,
  HTMLInputElement
> & {
  layout?: 'horizontal' | 'vertical';
  options?: CheckboxGroupProps['options'];
} & ProFormFieldRemoteProps;

const CheckboxGroup: React.FC<ProFormCheckboxGroupProps> = React.forwardRef(
  ({ options, fieldProps, proFieldProps, valueEnum, ...rest }, ref) => (
    <ProConfigProvider
      valueTypeMap={{
        checkbox: {
          render: (text, props) => <FieldCheckbox {...props} text={text} />,
          formItemRender: (text, props) => (
            <FieldCheckbox {...props} text={text} />
          ),
        },
      }}
    >
      <ProFormField
        ref={ref}
        valueType="checkbox"
        valueEnum={runFunction<[any]>(valueEnum, undefined)}
        fieldProps={{
          options,
          ...fieldProps,
        }}
        proFieldProps={proFieldProps}
        {...rest}
      />
    </ProConfigProvider>
  ),
);

export type ProFormCheckboxProps = ProFormFieldItemProps<CheckboxProps>;

/**
 * 多选框的
 *
 * @param
 */
const ProFormCheckboxComponents: React.FC<ProFormCheckboxProps> =
  React.forwardRef<CheckboxRef, ProFormCheckboxProps>(
    ({ fieldProps, children, readonly }, ref) => {
      const { ...restFieldProps } = fieldProps || {};
      return (
        <Checkbox
          ref={ref}
          // 单个 checkbox 不经过 ProField 的 mode 切换，readonly 时只能通过 disabled 阻止交互（#9107）
          disabled={readonly || restFieldProps.disabled}
          {...omit(restFieldProps, ['allowClear', 'disabled'])}
        >
          {children}
        </Checkbox>
      );
    },
  );

const ProFormCheckbox = warpField<ProFormCheckboxProps>?.(
  ProFormCheckboxComponents,
  {
    valuePropName: 'checked',
  },
);

const WrappedProFormCheckbox: typeof ProFormCheckboxComponents & {
  Group: typeof CheckboxGroup;
} = ProFormCheckbox as any;

WrappedProFormCheckbox.Group = CheckboxGroup;

export default WrappedProFormCheckbox;
