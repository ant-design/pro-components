import React from 'react';
import { Form, Radio } from 'antd';
import { RadioGroupProps, RadioProps } from 'antd/lib/radio';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

const RadioGroup = Radio.Group;

export type ProFormRadioGroupProps = ProFormItemProps<RadioGroupProps> & {
  layout?: 'horizontal' | 'vertical';
  options?: Array<
    | {
        value: string;
        label: React.ReactNode;
        disable?: boolean;
      }
    | string
  >;
};

const Group: React.FC<ProFormRadioGroupProps> = ({
  layout,
  children,
  proFieldProps,
  fieldProps,
  options,
  ...restProps
}) => {
  const renderChildren = () => {
    if (options) {
      return (
        <>
          {options.map((option) => {
            if (typeof option === 'string') {
              return (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              );
            }
            return (
              <Radio disabled={option.disable} key={option.value} value={option.value}>
                {option.label}
              </Radio>
            );
          })}
          {children}
        </>
      );
    }
    return children;
  };

  return (
    <Form.Item valuePropName="checked" {...restProps}>
      <RadioGroup {...fieldProps}>{renderChildren()}</RadioGroup>
    </Form.Item>
  );
};

/**
 * Radio
 * @param
 */
const ProFormRadio: React.FC<ProFormItemProps<RadioProps>> = ({
  fieldProps,
  proFieldProps,
  ...restProps
}) => {
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
