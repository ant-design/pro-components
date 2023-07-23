import { compareVersions } from '@ant-design/pro-utils';
// import { ColorPicker as ColorPickerV5, version } from 'antd';
import { version } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../index';
import { ColorPicker as ColorPickerV4 } from './old';
// https://ant.design/components/color-picker-cn 示例颜色
const DEFAULT_PRESETS = {
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
/**
 * 获取颜色组件
 * 兼容 5.5.0 以下的版本
 * @return {*} 
 */
function getColorPicker() {
  if (compareVersions(version, '5.5.0') > -1) {
    const { ColorPicker } = require('antd');
    return ColorPicker;
  }
  return ColorPickerV4
}
const ColorPicker = getColorPicker();
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
    const dom = <ColorPicker
      value={text}
      mode="read"
      ref={ref}
      // 设置无法 open 
      open={false} />;
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  if (type === 'edit' || type === 'update') {
    const dom = <ColorPicker ref={ref} presets={[DEFAULT_PRESETS]} {...fieldProps} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldColorPicker);
