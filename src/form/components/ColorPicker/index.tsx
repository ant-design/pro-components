import type { PopoverProps } from 'antd';
import React from 'react';
import { FieldColorPicker } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import type { ProFormFieldItemProps } from '../../typing';
import ProFromField from '../Field';

type ColorPickerProps = {
  value?: string;
  onChange?: (color: string) => void;
};

export type ProFormColorPickerProps = ProFormFieldItemProps<ColorPickerProps> & {
  popoverProps?: PopoverProps;
  colors?: string[];
};

/**
 * 颜色选择组件
 *
 * @param
 */
const ProFormColorPicker: React.FC<ProFormColorPickerProps> = ({
  fieldProps,
  popoverProps,
  proFieldProps,
  colors,
  ref,
  ...rest
}) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        color: {
          render: (text, props) => <FieldColorPicker {...props} text={text} />,
          formItemRender: (text, props) => <FieldColorPicker {...props} text={text} />,
        },
      }}
    >
      <ProFromField
        ref={ref}
        fieldConfig={{
          defaultProps: {
            width: '100%',
          },
        }}
        fieldProps={{
          popoverProps,
          colors,
          ...fieldProps,
        }}
        proFieldProps={proFieldProps}
        valueType="color"
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default ProFormColorPicker;
