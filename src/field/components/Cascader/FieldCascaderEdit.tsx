import { LoadingOutlined } from '@ant-design/icons';
import { Cascader } from 'antd';
import type { CascaderProps, GetRef } from 'antd';
import { clsx } from 'clsx';
import React from 'react';
import type { IntlType } from '../../../provider';
import type { ProFieldFC } from '../../types';
import type { GroupProps } from './types';

type Props = Omit<Parameters<ProFieldFC<GroupProps>>[0], 'options'> & {
  options: NonNullable<CascaderProps['options']>;
  loading: boolean;
  layoutClassName: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cascaderRef: React.RefObject<GetRef<typeof Cascader>>;
  intl: IntlType;
};

export function FieldCascaderEdit(props: Props) {
  const {
    placeholder,
    formItemRender,
    mode,
    variant: _variant,
    options,
    loading,
    layoutClassName,
    open,
    setOpen,
    cascaderRef,
    intl,
    ...rest
  } = props;

  const fieldProps = rest.fieldProps || {};
  let dom: React.ReactNode = (
    <Cascader
      ref={cascaderRef}
      open={open}
      suffixIcon={loading ? <LoadingOutlined /> : undefined}
      placeholder={
        placeholder || intl.getMessage('tableForm.selectPlaceholder', '请选择')
      }
      allowClear={fieldProps?.allowClear !== false}
      {...fieldProps}
      onOpenChange={(isOpen) => {
        fieldProps?.onOpenChange?.(isOpen);
        setOpen(isOpen);
      }}
      className={clsx(fieldProps?.className, layoutClassName)}
      options={options}
    />
  );

  if (formItemRender) {
    dom =
      formItemRender(
        rest.text,
        { mode, ...fieldProps, options, loading },
        dom,
      ) ?? null;
  }

  return dom;
}
