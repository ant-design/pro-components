import { ColorPicker } from 'antd';
import type { PresetsItem } from 'antd/es/color-picker/interface';
import React, { useImperativeHandle, useRef } from 'react';
import type { ProFieldFC } from '../../index';
// https://ant.design/components/color-picker-cn 示例颜色
const DEFAULT_PRESETS: PresetsItem = {
  label: 'Recommended',
  colors: [
    // '#000000',
    // '#000000E0',
    // '#000000A6',
    // '#00000073',
    // '#00000040',
    // '#00000026',
    // '#0000001A',
    // '#00000012',
    // '#0000000A',
    // '#00000005',
    '#F5222D',
    '#FA8C16',
    '#FADB14',
    '#8BBB11',
    '#52C41A',
    '#13A8A8',
    '#1677FF',
    '#2F54EB',
    '#722ED1',
    '#EB2F96',
    '#F5222D4D',
    '#FA8C164D',
    '#FADB144D',
    '#8BBB114D',
    '#52C41A4D',
    '#13A8A84D',
    '#1677FF4D',
    '#2F54EB4D',
    '#722ED14D',
    '#EB2F964D',
  ],
}
const FieldColor: ProFieldFC<{
  text: string;
}> = (
  { text, mode, render, renderFormItem, fieldProps },
  ref,
) => {
    const inputRef = useRef<HTMLInputElement>();
    useImperativeHandle(ref, () => inputRef.current, []);
    if (mode === 'read') {
      const dom = (
        <ColorPicker
          ref={inputRef}
          presets={[DEFAULT_PRESETS]}
          {...fieldProps}
          // 设置无法 open 
          open={false}
        />
      );
      if (render) {
        return render(text, { mode, ...fieldProps }, dom);
      }
      return dom;
    }
    if (mode === 'edit' || mode === 'update') {
      const dom = (
        <ColorPicker
          ref={inputRef}
          presets={[DEFAULT_PRESETS]}
          {...fieldProps}
        />
      );

      if (renderFormItem) {
        return renderFormItem(text, { mode, ...fieldProps }, dom);
      }
      return dom;
    }
    return null;
  };

export default React.forwardRef(FieldColor);
