import type { CheckboxProps, CheckboxRef } from 'antd';
import { Checkbox } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import React from 'react';
import { FieldCheckbox } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import { runFunction } from '../../../utils';
import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '../../typing';
import ProFormField from '../Field';
import warpField from '../FormItem/warpField';

export type ProFormCheckboxGroupProps = ProFormFieldItemProps<CheckboxGroupProps, HTMLInputElement> & {
  layout?: 'horizontal' | 'vertical';
  options?: CheckboxGroupProps['options'];
} & ProFormFieldRemoteProps;

const CheckboxGroup: React.FC<ProFormCheckboxGroupProps> = ({
  options,
  fieldProps,
  proFieldProps,
  valueEnum,
  ref,
  ...rest
}) => (
  <ProConfigProvider
    valueTypeMap={{
      checkbox: {
        render: (text, props) => <FieldCheckbox {...props} text={text} />,
        formItemRender: (text, props) => <FieldCheckbox {...props} text={text} />,
      },
    }}
  >
    <ProFormField
      ref={ref}
      fieldProps={{
        options,
        ...fieldProps,
      }}
      lightProps={{
        labelFormatter: () => {
          return (
            <ProFormField
              ref={ref}
              fieldConfig={{
                customLightMode: true,
              }}
              fieldProps={{
                options,
                ...fieldProps,
              }}
              mode="read"
              proFieldProps={proFieldProps}
              valueEnum={runFunction<[any]>(valueEnum, undefined)}
              valueType="checkbox"
              {...rest}
            />
          );
        },
        ...rest.lightProps,
      }}
      proFieldProps={proFieldProps}
      valueEnum={runFunction<[any]>(valueEnum, undefined)}
      valueType="checkbox"
      {...rest}
    />
  </ProConfigProvider>
);

export type ProFormCheckboxProps = ProFormFieldItemProps<CheckboxProps>;

/**
 * 多选框的
 *
 * @param
 */
const ProFormCheckboxComponents: React.FC<
  ProFormCheckboxProps & {
    ref?: React.Ref<CheckboxRef>;
  }
> = ({ fieldProps, children, ref }) => {
  return (
    <Checkbox ref={ref} {...fieldProps}>
      {children}
    </Checkbox>
  );
};

const ProFormCheckbox = warpField<ProFormCheckboxProps>?.(ProFormCheckboxComponents, {
  valuePropName: 'checked',
});

const WrappedProFormCheckbox: typeof ProFormCheckboxComponents & {
  Group: typeof CheckboxGroup;
} = ProFormCheckbox as any;

WrappedProFormCheckbox.Group = CheckboxGroup;

export default WrappedProFormCheckbox;
