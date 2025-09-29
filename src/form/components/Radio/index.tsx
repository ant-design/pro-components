import type { RadioGroupProps, RadioProps } from 'antd';
import { Radio } from 'antd';
import React from 'react';
import FieldRadio from '../../../field/components/Radio';
import { ProConfigProvider } from '../../../provider';
import { runFunction } from '../../../utils';
import type { ProFormFieldItemProps, ProFormFieldRemoteProps } from '../../typing';
import ProField from '../Field';
import warpField from '../FormItem/warpField';

export type ProFormRadioGroupProps = ProFormFieldItemProps<RadioGroupProps, HTMLDivElement> & {
  layout?: 'horizontal' | 'vertical';
  radioType?: 'button' | 'radio';
  options?: RadioGroupProps['options'];
} & ProFormFieldRemoteProps;

const RadioGroup: React.FC<ProFormRadioGroupProps> = ({
  fieldProps,
  options,
  radioType,
  layout,
  proFieldProps,
  valueEnum,
  ref,
  ...rest
}) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        radio: {
          render: (text, props) => <FieldRadio {...props} text={text} />,
          formItemRender: (text, props) => <FieldRadio {...props} text={text} />,
        },
        radioButton: {
          render: (text, props) => {
            console.log(props);
            return <FieldRadio radioType="button" {...props} text={text} />;
          },
          formItemRender: (text, props) => <FieldRadio radioType="button" {...props} text={text} />,
        },
      }}
    >
      <ProField
        ref={ref}
        valueEnum={runFunction<[any]>(valueEnum, undefined)}
        valueType={radioType === 'button' ? 'radioButton' : 'radio'}
        {...rest}
        fieldConfig={{
          customLightMode: true,
        }}
        fieldProps={{
          options,
          layout,
          ...fieldProps,
        }}
        proFieldProps={proFieldProps}
      />
    </ProConfigProvider>
  );
};

/**
 * Radio
 *
 * @param
 */
const ProFormRadioComponents: React.FC<ProFormFieldItemProps<RadioProps>> = ({ fieldProps, children, ref }) => {
  return (
    <Radio {...fieldProps} ref={ref}>
      {children}
    </Radio>
  );
};

const ProFormRadio = warpField<ProFormFieldItemProps<RadioProps>>?.(ProFormRadioComponents, {
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

WrappedProFormRadio.displayName = 'ProFormComponent';

export default WrappedProFormRadio;
