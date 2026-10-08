import type { ColorPickerProps, PopoverProps } from 'antd';
import React from 'react';
import FieldColorPicker from '../../../field/components/ColorPicker';
import { ProConfigProvider } from '../../../provider';
import type { ProRenderFieldPropsType } from '../../../provider/typing/config';
import type { ProFormFieldItemProps } from '../../typing';
import ProFromField from '../Field';

const FORM_VALUE_TYPE_MAP: Record<string, ProRenderFieldPropsType> = {
  color: {
    render: (text, props) => <FieldColorPicker {...props} text={text} />,
    formItemRender: (text, props) => (
      <FieldColorPicker {...props} text={text} />
    ),
  },
};

export type ProFormColorPickerProps =
  ProFormFieldItemProps<ColorPickerProps> & {
    popoverProps?: PopoverProps;
    colors?: string[];
  };

/**
 * 颜色选择组件
 *
 * @param
 */
const ProFormColorPicker: React.ForwardRefRenderFunction<
  any,
  ProFormColorPickerProps
> = ({ fieldProps, popoverProps, proFieldProps, colors, ...rest }, ref) => {
  return (
    <ProConfigProvider valueTypeMap={FORM_VALUE_TYPE_MAP}>
      <ProFromField
        valueType="color"
        fieldProps={{
          popoverProps,
          colors,
          ...fieldProps,
        }}
        ref={ref}
        proFieldProps={proFieldProps}
        fieldConfig={{
          defaultProps: {
            width: '100%',
          },
        }}
        {...rest}
      />
    </ProConfigProvider>
  );
};

const ForwardedProFormColorPicker = React.forwardRef(ProFormColorPicker) as any;
export default ForwardedProFormColorPicker;
