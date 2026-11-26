import type { SliderRangeProps, SliderSingleProps } from 'antd';
import React, { useContext, useMemo } from 'react';
import { FieldSlider } from '../../../field/FieldLoaders';
import {
  mergeFormValueTypeMap,
  type ValueTypeRenderFallback,
} from '../../../field/ValueTypeToComponent';
import { ProConfigProvider, ProProvider } from '../../../provider';
import type { SliderBaseProps } from '../../../utils/antdTypes';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

const FALLBACK_VALUE_TYPE_MAP: Record<string, ValueTypeRenderFallback> = {
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
    const proContext = useContext(ProProvider);
    const valueTypeMap = useMemo(
      () =>
        mergeFormValueTypeMap(proContext.valueTypeMap, FALLBACK_VALUE_TYPE_MAP),
      [proContext.valueTypeMap],
    );
    return (
      <ProConfigProvider valueTypeMap={valueTypeMap}>
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
