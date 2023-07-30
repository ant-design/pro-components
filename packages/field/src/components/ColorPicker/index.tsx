import { compareVersions } from '@ant-design/pro-utils';
import { ConfigProvider, version } from 'antd';
import React, { useContext, useMemo } from 'react';
import type { ProFieldFC } from '../../index';
import { ColorPicker as ColorPickerV4 } from './old';
import classNames from 'classnames';
// https://ant.design/components/color-picker-cn 示例颜色
const DEFAULT_PRESETS = {
  label: 'Recommended',
  colors: [
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
 * 判断是否是 5.5.0 以上的版本
 * @returns 
 */
function IsIt_Render_V5() {
  return compareVersions(version, '5.5.0') > -1
}
/**
 * 获取颜色组件
 * 兼容 5.5.0 以下的版本
 * @return {*} 
 */
function getColorPicker() {
  if (IsIt_Render_V5()) {
    const { ColorPicker } = require('antd');
    return ColorPicker;
  }
  return ColorPickerV4
}
const ColorPicker = getColorPicker();
/**
 * 颜色组件
 * Antd > 5.5.0 的版本 使用 antd 的 ColorPicker
 * @param FieldColorPicker {
 *     text: number;
 *     moneySymbol?: string; }
 */
const FieldColorPicker: ProFieldFC<{
  text: string;
}> = ({ text, mode: type, render, renderFormItem, fieldProps }, ref: any) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-color-picker');
  // 5.5.0 以上版本追加 className
  const className = useMemo(() => classNames({ [prefixCls]: IsIt_Render_V5() }),[prefixCls]);
  if (type === 'read') {
    const dom = <ColorPicker
      value={text}
      mode="read"
      ref={ref}
      className={className}
      // 设置无法 open 
      open={false} />;
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  if (type === 'edit' || type === 'update') {
    const dom = <ColorPicker ref={ref} presets={[DEFAULT_PRESETS]} {...fieldProps} className={className} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldColorPicker);
