import { omit } from '@rc-component/util';
import type { SwitchProps } from 'antd';
import { Switch } from 'antd';
import React from 'react';
import { FieldLabel } from '../../../utils';
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

export function FieldSwitchLightEdit(props: Props, ref: React.Ref<unknown>) {
  const { text, mode, label, formItemRender, fieldProps, variant } = props;

  const editDom = (
    <Switch
      ref={ref as React.Ref<any>}
      size="small"
      {...omit(fieldProps || {}, ['value'])}
      checked={fieldProps?.checked ?? fieldProps?.value}
    />
  );

  const dom = (
    <FieldLabel
      label={label}
      disabled={fieldProps?.disabled}
      variant={variant}
      downIcon={false}
      value={
        <div
          style={{
            paddingInlineStart: 8,
          }}
        >
          {editDom}
        </div>
      }
      allowClear={false}
    />
  );

  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, dom);
  }
  return dom;
}
