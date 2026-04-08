import type { ColorPickerProps } from 'antd';
import { ColorPicker, ConfigProvider } from 'antd';
import { clsx } from 'clsx';
import { useContext } from 'react';
import type { ProFieldFC } from '../../types';

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

type Props = Parameters<
  ProFieldFC<
    {
      text: string;
      mode?: 'read' | 'edit' | 'update';
    } & Partial<Omit<ColorPickerProps, 'value' | 'mode'>>
  >
>[0];

export function FieldColorPickerEdit(props: Props, ref: any) {
  const { text, mode: type, formItemRender, fieldProps } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-color-picker');

  const style = { display: 'table-cell', ...fieldProps.style };
  const dom = (
    <ColorPicker
      ref={ref}
      presets={[DEFAULT_PRESETS]}
      {...fieldProps}
      style={style}
      className={clsx({ [prefixCls]: true })}
    />
  );
  if (formItemRender) {
    return formItemRender(text, { mode: type, ...fieldProps, style }, dom);
  }
  return dom;
}
