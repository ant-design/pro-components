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

export function FieldSwitchEdit(props: Props, ref: React.Ref<unknown>) {
  const { text, mode, light, label, formItemRender, fieldProps, variant } =
    props;

  const editDom = (
    <Switch
      ref={ref as React.Ref<any>}
      size={light ? 'small' : undefined}
      {...omit(fieldProps, ['value'])}
      checked={fieldProps?.checked ?? fieldProps?.value}
    />
  );
  if (light) {
    const { disabled } = fieldProps;
    return (
      <FieldLabel
        label={label}
        disabled={disabled}
        variant={variant}
        downIcon={false}
        value={
          <div
            style={{
              paddingLeft: 8,
            }}
          >
            {editDom}
          </div>
        }
        allowClear={false}
      />
    );
  }

  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, editDom);
  }
  return editDom;
}
