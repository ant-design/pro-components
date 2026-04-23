import { omit } from '@rc-component/util';
import type { SwitchProps } from 'antd';
import { Switch } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../types';

type Props = Parameters<
  ProFieldFC<{
    text: boolean;
    fieldProps?: SwitchProps;
    variant?: 'outlined' | 'borderless' | 'filled';
  }>
>[0] & {
  variant: 'outlined' | 'borderless' | 'filled' | undefined;
};

export function FieldSwitchEdit(props: Props, ref: React.Ref<unknown>) {
  const { text, mode, formItemRender, fieldProps } = props;

  const editDom = (
    <Switch
      ref={ref as React.Ref<any>}
      {...omit(fieldProps || {}, ['value'])}
      checked={fieldProps?.checked ?? fieldProps?.value}
    />
  );

  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, editDom);
  }
  return editDom;
}
