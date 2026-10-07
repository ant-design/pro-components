import type { SliderRangeProps, SliderSingleProps } from 'antd';
import React from 'react';
import FieldSlider from '../../../field/components/Slider';
import { ProConfigProvider } from '../../../provider';
import type { ProRenderFieldPropsType } from '../../../provider/typing/config';
import type { SliderBaseProps } from '../../../utils/antdTypes';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

const FORM_VALUE_TYPE_MAP: Record<string, ProRenderFieldPropsType> = {
  slider: {
    render: (text, props) => <FieldSlider {...props} text={text} />,
    formItemRender: (text, props) => <FieldSlider {...props} text={text} />,
  },
};

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
      <ProConfigProvider valueTypeMap={FORM_VALUE_TYPE_MAP}>
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
          fieldConfig={{
            ignoreWidth: true,
          }}
          {...rest}
        />
      </ProConfigProvider>
    );
  },
);

export default ProFormSlider;
