import React from 'react';
import type { SketchPickerProps } from 'react-color';
import type { PopoverProps } from 'antd';
import ProFromField from '../Field';
import type { ProFormFieldItemProps } from '../../interface';

type ColorPickerProps = SketchPickerProps & {
  value?: string;
  onChange?: (color: string) => void;
};

export type ProFormColorPickerProps = ProFormFieldItemProps<ColorPickerProps> & {
  popoverProps?: PopoverProps;
  colors?: string[];
};
/**
 * 数组选择组件
 *
 * @param
 */
const ProFormColorPicker: React.ForwardRefRenderFunction<any, ProFormColorPickerProps> = (
  { fieldProps, popoverProps, proFieldProps, colors, ...rest },
  ref,
) => {
  return (
    <ProFromField
      mode="edit"
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
