import type { InputNumberProps } from 'antd';
import React from 'react';
import { FieldDigit } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import type { ProFormFieldItemProps } from '../../typing';
import ProFormField from '../Field';

export type ProFormDigitProps = ProFormFieldItemProps<InputNumberProps<number>> & {
  min?: InputNumberProps['min'];
  max?: InputNumberProps['max'];
};

/**
 * 数组选择组件
 *
 */
const ProFormDigit: React.FC<ProFormDigitProps> = ({ fieldProps, min, proFieldProps, max, ref, ...rest }) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        digit: {
          render: (text, props) => <FieldDigit {...props} placeholder={props.placeholder as string} text={text} />,
          formItemRender: (text, props) => (
            <FieldDigit {...props} placeholder={props.placeholder as string} text={text} />
          ),
        },
      }}
    >
      <ProFormField
        ref={ref}
        fieldConfig={{
          defaultProps: {
            width: '100%',
          },
        }}
        fieldProps={{
          min,
          max,
          ...fieldProps,
        }}
        proFieldProps={proFieldProps}
        valueType="digit"
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default ProFormDigit;
