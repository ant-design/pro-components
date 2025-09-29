import type { ColorPickerProps } from 'antd';
import { ColorPicker, ConfigProvider } from 'antd';
import classNames from 'classnames';
import { useContext } from 'react';
import type { ProFieldFC } from '../../PureProField';

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
};

/**
 * 颜色组件
 * Antd > 5.5.0 的版本 使用 antd 的 ColorPicker
 *
 */
const FieldColorPicker: ProFieldFC<
  {
    text: string;
    mode?: 'read' | 'edit' | 'update';
  } & Partial<Omit<ColorPickerProps, 'value' | 'mode'>>
> = ({ text, mode: type, render, formItemRender, fieldProps, ref }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-color-picker');

  if (type === 'read') {
    const dom = <ColorPicker className={classNames({ [prefixCls]: true })} open={false} value={text} />;
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }

  if (type === 'edit' || type === 'update') {
    // 解决 默认的 width 100% 问题
    const style = { display: 'table-cell', ...fieldProps.style };
    const dom = (
      <ColorPicker
        ref={ref}
        presets={[DEFAULT_PRESETS]}
        {...fieldProps}
        className={classNames({ [prefixCls]: true })}
        style={style}
      />
    );
    if (formItemRender) {
      return formItemRender(text, { mode: type, ...fieldProps, style }, dom);
    }
    return dom;
  }

  return null;
};

export default FieldColorPicker;
