import type { SketchPickerProps } from 'react-color';
import { SketchPicker } from 'react-color';
import React from 'react';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { PopoverProps } from 'antd';
import { Popover } from 'antd';
import type { ProFieldFC } from '../../index';

export type FieldDigitProps = {
  text: string;
};

const ColorPicker: React.FC<
  SketchPickerProps & {
    value?: string;
    popoverProps?: PopoverProps;
    mode?: 'read' | 'edit';
    onChange?: (color: string) => void;
  }
> = ({ mode, popoverProps, ...rest }) => {
  const [color, setColor] = useMergedState('#1890ff', {
    value: rest.value,
    onChange: rest.onChange,
  });
  const readDom = (
    <div
      style={{
        padding: 5,
        border: '1px solid #ddd',
        borderRadius: '2px',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          backgroundColor: color,
          width: 36,
          height: 14,
          borderRadius: '2px',
        }}
      />
    </div>
  );
  if (mode === 'read') {
    return readDom;
  }
  return (
    <Popover
      trigger="click"
      {...popoverProps}
      content={
        <div
          style={{
            margin: '-12px -16px',
          }}
        >
          <SketchPicker
            {...rest}
            color={color}
            onChange={undefined}
            onChangeComplete={(value) => {
              setColor(value.hex);
            }}
          />
        </div>
      }
    >
      {readDom}
    </Popover>
  );
};

/**
 * 颜色组件
 *
 * @param FieldColorPicker {
 *     text: number;
 *     moneySymbol?: string; }
 */
const FieldColorPicker: ProFieldFC<FieldDigitProps> = (
  { text, mode: type, render, renderFormItem, fieldProps },
  ref,
) => {
  if (type === 'read') {
    const dom = (
      <div
        style={{
          padding: 5,
          border: '1px solid #ddd',
          borderRadius: '2px',
          cursor: 'pointer',
        }}
      >
        <div
          ref={ref}
          style={{
            backgroundColor: text,
            width: 36,
            height: 14,
            borderRadius: '2px',
          }}
        />
      </div>
    );
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  if (type === 'edit' || type === 'update') {
    const dom = <ColorPicker {...fieldProps} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldColorPicker);
