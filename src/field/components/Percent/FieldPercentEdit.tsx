import { InputNumber } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../types';
import type { PercentPropInt } from './types';

type Props = Parameters<ProFieldFC<PercentPropInt>>[0] & {
  placeholderValue: string;
};

export function FieldPercentEdit(props: Props, ref: React.Ref<unknown>) {
  const { text, mode, formItemRender, fieldProps, prefix, placeholderValue } =
    props;
  const dom = (
    <InputNumber
      ref={ref as React.Ref<any>}
      formatter={(value) => {
        if (value && prefix) {
          return `${prefix} ${value}`.replace(/\B(?=(\d{3})+(?!\d)$)/g, ',');
        }
        return value;
      }}
      parser={(value) => (value ? value.replace(/.*\s|,/g, '') : '')}
      placeholder={placeholderValue}
      {...fieldProps}
    />
  );
  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, dom);
  }
  return dom;
}
