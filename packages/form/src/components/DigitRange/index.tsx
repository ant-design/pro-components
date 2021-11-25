import React from 'react';
import type { InputNumberProps } from 'antd';
import ProFormField from '../Field';
import type { ProFormFieldItemProps } from '../../interface';
import type {
  RangeInputNumberProps,
  ExtraProps,
} from '../../../../field/src/components/DigitRange';

export type ProFormDigitRangeProps = ProFormFieldItemProps<RangeInputNumberProps> &
  ExtraProps & {
    min?: InputNumberProps['min'];
    max?: InputNumberProps['max'];
  };
/**
 * 数字范围选择组件
 *
 * @param
 */
const ProFormDigit: React.ForwardRefRenderFunction<any, ProFormDigitRangeProps> = (
  { fieldProps, proFieldProps, min, max, ...rest },
  ref,
) => {
  return (
    <ProFormField
      mode="edit"
      valueType="digitRange"
      fieldProps={{
        min,
        max,
        ...fieldProps,
      }}
      ref={ref}
      filedConfig={{
        defaultProps: {
          width: '100%',
        },
      }}
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

export default React.forwardRef(ProFormDigit);
