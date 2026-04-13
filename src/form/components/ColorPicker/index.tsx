import type { PopoverProps } from 'antd';
import React from 'react';
import { FieldColorPicker } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import type { ProFormFieldItemProps } from '../../typing';
import ProFromField from '../Field';

/** 使用宽松字段类型，避免 d.ts 生成时拉入 `@rc-component/color-picker` 导致 TS2742 */
export type ProFormColorPickerProps = ProFormFieldItemProps<
  Record<string, unknown>
> & {
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

export default React.forwardRef(ProFormColorPicker);
