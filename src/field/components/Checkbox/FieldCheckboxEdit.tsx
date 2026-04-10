import { Checkbox } from 'antd';
import { clsx } from 'clsx';
import React from 'react';
import type { ProFieldFC } from '../../types';
import type { GroupProps } from './types';

type Props = Omit<Parameters<ProFieldFC<GroupProps>>[0], 'options'> & {
  layout: 'horizontal' | 'vertical';
  options: any[];
  loading: boolean;
  layoutClassName: string;
  wrapSSR: (node: React.ReactElement) => React.ReactElement;
  hashId: string;
  status: { status?: string } | undefined;
};

export function FieldCheckboxEdit(props: Props) {
  const {
    layout,
    formItemRender,
    mode,
    options,
    loading,
    layoutClassName,
    wrapSSR,
    hashId,
    status,
    ...rest
  } = props;

  const {
    fieldNames: _fieldNames,
    variant,
    ...restFieldProps
  } = rest.fieldProps || {};

  const dom = wrapSSR(
    <Checkbox.Group
      {...restFieldProps}
      variant={variant}
      className={clsx(
        rest.fieldProps?.className,
        hashId,
        `${layoutClassName}-${layout}`,
        {
          [`${layoutClassName}-error`]: status?.status === 'error',
          [`${layoutClassName}-warning`]: status?.status === 'warning',
        },
      )}
      options={options}
    />,
  );
  if (formItemRender) {
    return (
      formItemRender(
        rest.text,
        { mode, ...rest.fieldProps, options, loading },
        dom,
      ) ?? null
    );
  }
  return dom;
}
