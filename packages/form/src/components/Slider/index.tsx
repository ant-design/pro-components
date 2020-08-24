import React from 'react';
import { Slider, Form } from 'antd';
import { SliderSingleProps } from 'antd/lib/slider';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

export type ProFormSliderProps = ProFormItemProps<SliderSingleProps> & {
  min?: SliderSingleProps['min'];
  max?: SliderSingleProps['max'];
  step?: SliderSingleProps['step'];
  marks?: SliderSingleProps['marks'];
  vertical?: SliderSingleProps['vertical'];
};
/**
 * 文本选择组件
 * @param
 */
const ProFormSlider: React.ForwardRefRenderFunction<any, ProFormSliderProps> = (
  { fieldProps, proFieldProps, min, max, step, marks, vertical, ...restProps },
  ref,
) => {
  return (
    <Form.Item {...restProps}>
      <Slider
        min={min}
        max={max}
        step={step}
        marks={marks}
        vertical={vertical}
        {...fieldProps}
        ref={ref}
      />
    </Form.Item>
  );
};

export default createField<ProFormSliderProps>(React.forwardRef(ProFormSlider));
