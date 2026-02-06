import { omit } from '@rc-component/util';
import type { RadioGroupProps, RadioProps } from 'antd';
import { Radio } from 'antd';
import React from 'react';
import FieldRadio from '../../../field/components/Radio';
import { ProConfigProvider } from '../../../provider';
import { runFunction } from '../../../utils';
import type {
  ProFormFieldItemProps,
  ProFormFieldRemoteProps,
} from '../../typing';
import ProField from '../Field';
import warpField from '../FormItem/warpField';

export type ProFormRadioGroupProps = ProFormFieldItemProps<
  RadioGroupProps,
  HTMLDivElement
> & {
  layout?: 'horizontal' | 'vertical';
  radioType?: 'button' | 'radio';
  options?: RadioGroupProps['options'];
} & ProFormFieldRemoteProps;

const RadioGroup: React.FC<ProFormRadioGroupProps> = React.forwardRef(
  (
    {
      fieldProps,
      options,
      radioType,
      layout,
      proFieldProps,
      valueEnum,
      ...rest
    },
    ref: any,
  ) => {
    return (
      <ProConfigProvider
        valueTypeMap={{
          radio: {
            render: (text, props) => <FieldRadio {...props} text={text} />,
            formItemRender: (text, props) => (
              <FieldRadio {...props} text={text} />
            ),
          },
          radioButton: {
            render: (text, props) => {
              console.log(props);
              return <FieldRadio radioType={'button'} {...props} text={text} />;
            },
            formItemRender: (text, props) => (
              <FieldRadio radioType={'button'} {...props} text={text} />
            ),
          },
        }}
      >
        <ProField
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
          fieldConfig={{
            customLightMode: true,
          }}
        />
      </ProConfigProvider>
    );
  },
);

/**
 * Radio
 *
 * @param
 */
const ProFormRadioComponents: React.FC<ProFormFieldItemProps<RadioProps>> =
  React.forwardRef(({ fieldProps, children }, ref: any) => {
    const { ...restFieldProps } = fieldProps || {};
    return (
      <Radio {...omit(restFieldProps, ['allowClear'])} ref={ref}>
        {children}
      </Radio>
    );
  });

const ProFormRadio = warpField<ProFormFieldItemProps<RadioProps>>?.(
  ProFormRadioComponents,
  {
    valuePropName: 'checked',
    ignoreWidth: true,
  },
);

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
