import React from 'react';
import { Form, Radio } from 'antd';
import { RadioGroupProps, RadioProps } from 'antd/lib/radio';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

const RadioGroup = Radio.Group;

export type ProFormRadioGroupProps = ProFormItemProps<RadioGroupProps> & {
  layout?: 'horizontal' | 'vertical';
};

const Group: React.FC<ProFormRadioGroupProps> = ({
  layout,
  children,
  fieldProps,
  ...restProps
}) => {
  return (
    <Form.Item valuePropName="checked" {...restProps}>
      <RadioGroup {...fieldProps}>{children}</RadioGroup>
    </Form.Item>
  );
};

/**
 * Radio
 * @param
 */
const ProFormRadio: React.FC<ProFormItemProps<RadioProps>> = ({ fieldProps, ...restProps }) => {
  return (
    <Form.Item valuePropName="checked" {...restProps}>
      <Radio {...fieldProps} />
    </Form.Item>
  );
};

// @ts-expect-error
const WrappedProFormRadio: React.ComponentType<ProFormItemProps<RadioProps>> & {
  Group: React.ComponentType<ProFormRadioGroupProps>;
  Button: typeof Radio.Button;
} = createField<ProFormItemProps<RadioProps>>(ProFormRadio);

WrappedProFormRadio.Group = createField(Group);
WrappedProFormRadio.Button = Radio.Button;

export default WrappedProFormRadio;
