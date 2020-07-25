import React from 'react';
import { Form, Radio } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { RadioGroupProps, RadioProps } from 'antd/lib/radio';
import { createField } from '../../BaseForm';

const RadioGroup = Radio.Group;

export type ProFormRadioGroupProps = FormItemProps &
  RadioGroupProps & {
    layout: 'horizontal' | 'vertical';
  };

const Group: React.FC<ProFormRadioGroupProps> = ({
  value,
  layout,
  options,
  children,
  ...restProps
}) => {
  return (
    <Form.Item valuePropName="checked" {...restProps}>
      <RadioGroup {...restProps}>{children}</RadioGroup>
    </Form.Item>
  );
};

/**
 * Radio
 * @param
 */
const ProFormRadio: React.FC<FormItemProps & RadioProps> = ({
  value,
  ...restProps
}) => {
  return (
    <Form.Item valuePropName="checked" {...restProps}>
      <Radio {...restProps} />
    </Form.Item>
  );
};

// @ts-expect-error
const WrappedProFormRadio: React.ComponentType<FormItemProps & RadioProps> & {
  Group: React.ComponentType<ProFormRadioGroupProps>;
  Button: typeof Radio.Button;
} = createField<FormItemProps & RadioProps>(ProFormRadio);

WrappedProFormRadio.Group = createField(Group);
WrappedProFormRadio.Button = Radio.Button;

export default WrappedProFormRadio;
