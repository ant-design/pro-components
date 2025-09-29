import type { SliderSingleProps } from 'antd';
import type { SliderBaseProps, SliderRangeProps } from 'antd/es/slider';
import React from 'react';
import { FieldSlider } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

export type ProFormSliderProps = ProFormFieldItemProps<SliderSingleProps | SliderRangeProps, unknown> & {
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
const ProFormSlider: React.FC<ProFormSliderProps> = ({
  fieldProps,
  proFieldProps,
  min,
  max,
  step,
  marks,
  vertical,
  range,
  ref,
  ...rest
}) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        slider: {
          render: (text, props) => <FieldSlider {...props} text={text} />,
          formItemRender: (text, props) => <FieldSlider {...props} text={text} />,
        },
      }}
    >
      <ProField
        ref={ref}
        fieldConfig={{
          ignoreWidth: true,
        }}
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
        proFieldProps={proFieldProps}
        valueType="slider"
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default ProFormSlider;
