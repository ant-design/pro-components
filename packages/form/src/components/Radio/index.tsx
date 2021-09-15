import React from 'react';
import type { RadioProps, RadioGroupProps } from 'antd';
import { Radio } from 'antd';
import ProField from '../Field';
import type { ProSchema } from '@ant-design/pro-utils';
import { runFunction } from '@ant-design/pro-utils';
import type { ProFormFieldItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

export type ProFormRadioGroupProps = ProFormFieldItemProps<RadioGroupProps> & {
  layout?: 'horizontal' | 'vertical';
  radioType?: 'button' | 'radio';
  options?: RadioGroupProps['options'];
  valueEnum?: ProSchema['valueEnum'];
  request?: ProSchema['request'];
};

const RadioGroup: React.FC<ProFormRadioGroupProps> = React.forwardRef(
  ({ fieldProps, options, radioType, layout, proFieldProps, valueEnum, ...rest }, ref: any) => {
    return (
      <ProField
        mode="edit"
        valueType={radioType === 'button' ? 'radioButton' : 'radio'}
        ref={ref}
        valueEnum={runFunction<[any]>(valueEnum, undefined)}
        {...rest}
        fieldProps={{
          options,
          layout,
          ...fieldProps,
        }}
        proFieldProps={proFieldProps}
        filedConfig={{
          customLightMode: true,
        }}
      />
    );
  },
);

/**
 * Radio
 *
 * @param
 */
const ProFormRadioComponents: React.FC<ProFormFieldItemProps<RadioProps>> = React.forwardRef(
  ({ fieldProps, children }, ref: any) => {
    return (
      <Radio {...fieldProps} ref={ref}>
        {children}
      </Radio>
    );
  },
);

const ProFormRadio = createField<ProFormFieldItemProps<RadioProps>>(ProFormRadioComponents, {
  valuePropName: 'checked',
  ignoreWidth: true,
});

const WrappedProFormRadio: typeof ProFormRadio & {
  Group: typeof RadioGroup;
  Button: typeof Radio.Button;
} = ProFormRadio as any;

WrappedProFormRadio.Group = RadioGroup;

WrappedProFormRadio.Button = Radio.Button;

// @ts-ignore
// eslint-disable-next-line no-param-reassign
WrappedProFormRadio.displayName = 'ProFormComponent';

export default WrappedProFormRadio;
