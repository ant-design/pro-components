import type { SketchPickerProps } from '@chenshuai2144/sketch-color';
import { SketchPicker } from '@chenshuai2144/sketch-color';
import type { PopoverProps } from 'antd';
import { ConfigProvider, Popover } from 'antd';

import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { useContext, useImperativeHandle } from 'react';
import type { ProFieldFC } from '../../index';

export const DEFAULT_COLORS = [
  '#FF9D4E', // 0 - 橘黄色
  '#5BD8A6', // 1 - 绿色
  '#5B8FF9', // 2 - 蓝色
  '#F7664E', // 3 - 红色
  '#FF86B7', // 4 - 水红色
  '#2B9E9D', // 5 - 墨绿色
  '#9270CA', // 6 - 紫色
  '#6DC8EC', // 7 - 浅蓝色
  '#667796', // 8 - 黛蓝色
  '#F6BD16', // 9 - 黄色
];

const ColorPicker = React.forwardRef(
  (
    {
      mode,
      popoverProps,
      ...rest
    }: SketchPickerProps & {
      value?: string;
      popoverProps?: PopoverProps;
      mode?: 'read' | 'edit';
      onChange?: (color: string) => void;
      colors?: string[];
    },
    ref,
  ) => {
    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    const prefixCls = getPrefixCls('pro-field-color-picker');
    const [color, setColor] = useMergedState('#1890ff', {
      value: rest.value,
      onChange: rest.onChange,
    });
    const readDom = (
      <div
        className={prefixCls}
        style={{
          padding: 5,
          width: 48,
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

    useImperativeHandle(ref, () => {});

    if (mode === 'read') {
      return readDom;
    }
    return (
      <Popover
        trigger="click"
        placement="right"
        {...popoverProps}
        content={
          <div
            style={{
              margin: '-12px -16px',
            }}
          >
            <SketchPicker
              {...rest}
              presetColors={rest.colors || rest.presetColors || DEFAULT_COLORS}
              color={color}
              onChange={({ hex, rgb: { r, g, b, a } }) => {
                if (a && a < 1) {
                  setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
                  return;
                }
                setColor(hex);
              }}
            />
          </div>
        }
      >
        {readDom}
      </Popover>
    );
  },
);

/**
 * 颜色组件
 *
 * @param FieldColorPicker {
 *     text: number;
 *     moneySymbol?: string; }
 */
const FieldColorPicker: ProFieldFC<{
  text: string;
}> = ({ text, mode: type, render, renderFormItem, fieldProps }, ref: any) => {
  if (type === 'read') {
    const dom = <ColorPicker value={text} mode="read" ref={ref} />;
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  if (type === 'edit' || type === 'update') {
    const dom = <ColorPicker ref={ref} {...fieldProps} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldColorPicker);
