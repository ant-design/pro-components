import { omit } from '@rc-component/util';
import { Segmented } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../types';
import type { FieldSelectProps } from '../Select';

type Props = Parameters<
  ProFieldFC<
    {
      text: string;
      emptyText?: React.ReactNode;
    } & FieldSelectProps
  >
>[0] & {
  options: any[];
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export function FieldSegmentedEdit(props: Props) {
  const { text, mode, formItemRender, fieldProps, options, loading, inputRef } =
    props;
  const dom = (
    <Segmented
      ref={inputRef as React.Ref<any>}
      {...(omit(fieldProps || {}, ['allowClear']) as object)}
      options={options}
    />
  );

  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps, options, loading }, dom);
  }
  return dom;
}
