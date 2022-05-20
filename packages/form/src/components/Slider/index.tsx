import type { SliderSingleProps } from 'antd';
import { Slider } from 'antd';
import type { SliderBaseProps, SliderRangeProps } from 'antd/lib/slider';
import React from 'react';
import { createField } from '../../BaseForm/createField';
import type { ProFormFieldItemProps } from '../../interface';

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
const BaseProFormSlider: React.ForwardRefRenderFunction<any, ProFormSliderProps> = (
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

const ProFormSlider = createField<ProFormSliderProps>(React.forwardRef(BaseProFormSlider), {
  lightFilterLabelFormatter: (value) => {
    if (Array.isArray(value)) {
      return value.join('~');
    }
    return value;
  },
}) as typeof BaseProFormSlider;

export default ProFormSlider;
