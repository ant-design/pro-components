import type { SliderSingleProps } from 'antd';
import type { SliderBaseProps, SliderRangeProps } from 'antd/lib/slider';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

export type ProFormSliderProps = ProFormFieldItemProps<
  SliderSingleProps | SliderRangeProps,
  unknown
> & {
  range?: boolean;
  min?: SliderBaseProps['min'];
  max?: SliderBaseProps['max'];
  step?: SliderBaseProps['step'];
  marks?: SliderBaseProps['marks'];
  vertical?: SliderBaseProps['vertical'];
};
/**
 * 文本选择组件
 *
 * @param
 */
const ProFormSlider = React.forwardRef<any, ProFormSliderProps>(
  (
    {
      fieldProps,
      proFieldProps,
      min,
      max,
      step,
      marks,
      vertical,
      range,
      ...rest
    },
    ref,
  ) => {
    return (
      <ProField
        valueType="slider"
        fieldProps={{
          ...fieldProps,
          min,
          max,
          step,
          marks,
          vertical,
          range,
          style: fieldProps?.style,
        }}
        ref={ref}
        proFieldProps={proFieldProps}
        filedConfig={{
          ignoreWidth: true,
        }}
        {...rest}
      />
    );
  },
);

export default ProFormSlider;
