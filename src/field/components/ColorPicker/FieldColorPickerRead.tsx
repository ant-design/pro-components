import type { ColorPickerProps } from 'antd';
import { ColorPicker, ConfigProvider } from 'antd';
import { clsx } from 'clsx';
import { useContext } from 'react';
import type { ProFieldFC } from '../../types';

type Props = Parameters<
  ProFieldFC<
    {
      text: string;
      mode?: 'read' | 'edit' | 'update';
    } & Partial<Omit<ColorPickerProps, 'value' | 'mode'>>
  >
>[0];

export function FieldColorPickerRead(props: Props) {
  const { text, mode: type, render, fieldProps } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-color-picker');

  const dom = (
    <ColorPicker
      value={text}
      className={clsx({ [prefixCls]: true })}
      open={false}
    />
  );
  if (render) {
    return render(text, { mode: type, ...fieldProps }, dom);
  }
  return dom;
}
