import React from 'react';
import type { SliderSingleProps, SliderRangeProps, SliderBaseProps } from 'antd';
import { Slider } from 'antd';
import type { ProFormFieldItemProps } from '../../interface';
import { createField } from '../../BaseForm/createField';

export type ProFormSliderProps = ProFormFieldItemProps<SliderSingleProps | SliderRangeProps> & {
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
const ProFormSlider: React.ForwardRefRenderFunction<any, ProFormSliderProps | SliderRangeProps> = (
  { fieldProps, min, max, step, marks, vertical, range },
  ref,
) => {
  return (
    <Slider
      min={min}
      max={max}
      step={step}
      marks={marks}
      vertical={vertical}
      range={range}
      {...(fieldProps as any)}
      ref={ref}
    />
  );
};

export default createField<ProFormSliderProps>(React.forwardRef(ProFormSlider), {
  lightFilterLabelFormatter: (value) => {
    if (Array.isArray(value)) {
      return value.join('~');
    }
    return value;
  },
});
