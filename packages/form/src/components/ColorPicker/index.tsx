import type { SketchPickerProps } from '@chenshuai2144/sketch-color';
import type { PopoverProps } from 'antd';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import ProFromField from '../Field';

type ColorPickerProps = SketchPickerProps & {
  value?: string;
  onChange?: (color: string) => void;
};

export type ProFormColorPickerProps =
  ProFormFieldItemProps<ColorPickerProps> & {
    popoverProps?: PopoverProps;
    colors?: string[];
  };
/**
 * 数组选择组件
 *
 * @param
 */
const ProFormColorPicker: React.ForwardRefRenderFunction<
  any,
  ProFormColorPickerProps
> = ({ fieldProps, popoverProps, proFieldProps, colors, ...rest }, ref) => {
  return (
    <ProFromField
      valueType="color"
      fieldProps={{
        popoverProps,
        colors,
        ...fieldProps,
      }}
      ref={ref}
      proFieldProps={proFieldProps}
      filedConfig={{
        defaultProps: {
          width: '100%',
        },
      }}
      {...rest}
    />
  );
};

export default React.forwardRef(ProFormColorPicker);
