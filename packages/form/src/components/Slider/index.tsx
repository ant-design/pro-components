import React from 'react';
import type { SliderSingleProps } from 'antd';
import { Slider } from 'antd';
import type { ProFormFieldItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

export type ProFormSliderProps = ProFormFieldItemProps<SliderSingleProps> & {
  range?: boolean;
  min?: SliderSingleProps['min'];
  max?: SliderSingleProps['max'];
  step?: SliderSingleProps['step'];
  marks?: SliderSingleProps['marks'];
  vertical?: SliderSingleProps['vertical'];
};
/**
 * 文本选择组件
 *
 * @param
 */
const ProFormSlider: React.ForwardRefRenderFunction<any, ProFormSliderProps> = (
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
