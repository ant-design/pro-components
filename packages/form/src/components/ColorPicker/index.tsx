import { FieldColorPicker } from '@ant-design/pro-field';
import { ProConfigProvider } from '@ant-design/pro-provider';
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
    <ProConfigProvider
      valueTypeMap={{
        color: {
          render: (text, props) => <FieldColorPicker {...props} text={text} />,
          formItemRender: (text, props) => (
            <FieldColorPicker {...props} text={text} />
          ),
        },
      }}
    >
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
    </ProConfigProvider>
  );
};

export default React.forwardRef(ProFormColorPicker);
