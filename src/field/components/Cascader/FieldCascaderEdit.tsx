import { LoadingOutlined } from '@ant-design/icons';
import { Cascader } from 'antd';
import { clsx } from 'clsx';
import React from 'react';
import type { IntlType } from '../../../provider';
import { FieldLabel } from '../../../utils';
import type { ProFieldFC } from '../../types';
import type { GroupProps } from './types';

type Props = Omit<Parameters<ProFieldFC<GroupProps>>[0], 'options'> & {
  options: any[];
  loading: boolean;
  layoutClassName: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cascaderRef: React.RefObject<any>;
  intl: IntlType;
};

export function FieldCascaderEdit(props: Props) {
  const {
    placeholder,
    formItemRender,
    mode,
    label,
    light,
    variant,
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

  if (light) {
    const { disabled, value } = fieldProps;
    const notEmpty = !!value && value?.length !== 0;
    return (
      <FieldLabel
        label={label}
        disabled={disabled}
        variant={variant}
        value={notEmpty || open ? dom : null}
        style={
          notEmpty
            ? {
                paddingInlineEnd: 0,
              }
            : undefined
        }
        allowClear={false}
        downIcon={notEmpty || open ? false : undefined}
        onClick={() => {
          setOpen(true);
          fieldProps?.onOpenChange?.(true);
        }}
      />
    );
  }
  return dom;
}
