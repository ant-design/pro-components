import React from 'react';
import type { SketchPickerProps } from 'react-color';
import type { PopoverProps } from 'antd';
import ProField from '@ant-design/pro-field';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

type ColorPickerProps = SketchPickerProps & {
  value?: string;
  onChange?: (color: string) => void;
};

type ProFormColorPickerProps = ProFormItemProps<ColorPickerProps> & {
  popoverProps?: PopoverProps;
  colors?: string[];
};
/**
 * 数组选择组件
 *
 * @param
 */
const ProFormColorPicker: React.ForwardRefRenderFunction<any, ProFormColorPickerProps> = (
  { fieldProps, popoverProps, proFieldProps, colors },
  ref,
) => {
  return (
    <ProField
      mode="edit"
      valueType="color"
      fieldProps={{
        popoverProps,
        colors,
        ...fieldProps,
      }}
      ref={ref}
      {...proFieldProps}
    />
  );
};

export default createField<ProFormColorPickerProps>(React.forwardRef(ProFormColorPicker), {
  defaultProps: {
    width: '100%',
  },
});
