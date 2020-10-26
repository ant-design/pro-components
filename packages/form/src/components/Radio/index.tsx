import React from 'react';
import { Radio } from 'antd';
import ProField from '@ant-design/pro-field';
import { ProSchema } from '@ant-design/pro-utils';
import { RadioGroupProps, RadioProps } from 'antd/lib/radio';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

export type ProFormRadioGroupProps = ProFormItemProps<RadioGroupProps> & {
  layout?: 'horizontal' | 'vertical';
  radioType?: 'button' | 'radio';
  options?: RadioGroupProps['options'];
  valueEnum?: ProSchema['valueEnum'];
  request?: ProSchema['request'];
};

const RadioGroup: React.FC<ProFormRadioGroupProps> = React.forwardRef(
  ({ fieldProps, options, radioType }, ref: any) => {
    return (
      <ProField
        mode="edit"
        valueType={radioType === 'button' ? 'radioButton' : 'radio'}
        ref={ref}
        fieldProps={{
          options,
          ...fieldProps,
        }}
      />
    );
  },
);

/**
 * Radio
 * @param
 */
const ProFormRadio: React.FC<ProFormItemProps<RadioProps>> = React.forwardRef(
  ({ fieldProps }, ref: any) => {
    return <Radio {...fieldProps} ref={ref} />;
  },
);

// @ts-expect-error
const WrappedProFormRadio: React.ComponentType<ProFormItemProps<RadioProps>> & {
  Group: typeof RadioGroup;
  Button: typeof Radio.Button;
} = createField<ProFormItemProps<RadioProps>>(ProFormRadio, {
  valuePropName: 'checked',
  ignoreFelidWidth: true,
});

WrappedProFormRadio.Group = createField(RadioGroup, {
  customLightMode: true,
  ignoreFelidWidth: true,
}) as typeof RadioGroup;

WrappedProFormRadio.Button = Radio.Button;

export default WrappedProFormRadio;
