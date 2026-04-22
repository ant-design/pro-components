import React, { MutableRefObject } from 'react';
import type { IntlType } from '../../../provider';
import type { ProFieldFC } from '../../types';
import LightSelect from './LightSelect';
import type { FieldSelectFullProps } from './FieldSelectSearchEdit';

export type FieldSelectLightEditProps = Parameters<
  ProFieldFC<FieldSelectFullProps>
>[0] & {
  intl: IntlType;
  loading: boolean;
  options: any[];
  fetchData: (keyWord?: string) => void;
  resetData: () => void;
  inputRef: React.RefObject<any>;
  keyWordsRef: MutableRefObject<string>;
  componentSize: string;
};

export function FieldSelectLightEdit(props: FieldSelectLightEditProps) {
  const {
    mode,
    formItemRender,
    fieldProps,
    id,
    label,
    variant,
    lightLabel,
    labelTrigger,
    intl,
    loading,
    options,
    fetchData,
    inputRef,
    componentSize,
    ...rest
  } = props;

  const dom = (
    <LightSelect
      id={id}
      loading={loading}
      ref={inputRef}
      allowClear
      size={componentSize as any}
      options={options}
      label={label}
      labelVariant={variant}
      placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
      lightLabel={lightLabel}
      labelTrigger={labelTrigger}
      fetchData={fetchData}
      {...fieldProps}
    />
  );

  if (formItemRender) {
    return (
      formItemRender(
        rest.text,
        { mode, ...fieldProps, options, loading },
        dom,
      ) ?? null
    );
  }
  return dom;
}
