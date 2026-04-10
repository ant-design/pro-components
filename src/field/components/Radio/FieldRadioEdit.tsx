import { Radio } from 'antd';
import { clsx } from 'clsx';
import React from 'react';
import type { ProFieldFC } from '../../types';
import type { GroupProps } from './types';

type Props = Omit<Parameters<ProFieldFC<GroupProps>>[0], 'options'> & {
  options: any[];
  loading: boolean;
  radioRef: React.RefObject<any>;
  layoutClassName: string;
  wrapSSR: (node: React.ReactElement) => React.ReactElement;
  hashId: string;
  status: { status?: string } | undefined;
};

export function FieldRadioEdit(props: Props) {
  const {
    radioType,
    formItemRender,
    mode,
    options,
    loading,
    radioRef,
    layoutClassName,
    wrapSSR,
    hashId,
    status,
    ...rest
  } = props;

  const dom = wrapSSR(
    <Radio.Group
      ref={radioRef}
      optionType={radioType}
      {...rest.fieldProps}
      className={clsx(
        rest.fieldProps?.className,
        {
          [`${layoutClassName}-error`]: status?.status === 'error',
          [`${layoutClassName}-warning`]: status?.status === 'warning',
        },
        hashId,
        `${layoutClassName}-${rest.fieldProps.layout || 'horizontal'}`,
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
