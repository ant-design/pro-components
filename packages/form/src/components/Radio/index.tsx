import React from 'react';
import { Radio } from 'antd';
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

const Group: React.FC<ProFormRadioGroupProps> = React.forwardRef(
  ({ children, fieldProps, options }, ref: any) => {
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
      <RadioGroup ref={ref} {...fieldProps}>
        {renderChildren()}
      </RadioGroup>
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
  Group: React.ComponentType<ProFormRadioGroupProps>;
  Button: typeof Radio.Button;
} = createField<ProFormItemProps<RadioProps>>(ProFormRadio, {
  valuePropName: 'checked',
  ignoreFelidWidth: true,
});

WrappedProFormRadio.Group = createField(Group, {
  customLightMode: true,
  ignoreFelidWidth: true,
});

WrappedProFormRadio.Button = Radio.Button;

export default WrappedProFormRadio;
