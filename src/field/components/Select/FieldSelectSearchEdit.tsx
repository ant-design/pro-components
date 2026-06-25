import type { GetRef, SelectProps } from 'antd';
import { Select, Spin } from 'antd';
import React from 'react';
import type { IntlType } from '../../../provider';
import type { RequestOptionsType } from '../../../utils';
import type { ProFieldFC } from '../../types';
import SearchSelect from './SearchSelect';
import type { FieldSelectProps } from './types';

export type FieldSelectFullProps = FieldSelectProps &
  Pick<SelectProps, 'fieldNames' | 'style' | 'className'>;

export type FieldSelectSearchEditProps = Parameters<
  ProFieldFC<FieldSelectFullProps>
>[0] & {
  intl: IntlType;
  loading: boolean;
  options: RequestOptionsType[];
  fetchData: (keyWord?: string) => void;
  resetData: () => void;
  inputRef: React.RefObject<GetRef<typeof Select>>;
};

export function FieldSelectSearchEdit(props: FieldSelectSearchEditProps) {
  const {
    mode,
    formItemRender,
    fieldProps,
    id,
    label,
    intl,
    loading,
    options,
    fetchData,
    resetData,
    inputRef,
    defaultKeyWords: _defaultKeyWords,
    request,
    fetchDataOnSearch = true,
    ...rest
  } = props;
  const dom = (
    <SearchSelect
      key="SearchSelect"
      className={rest.className}
      style={{
        minWidth: 100,
        ...rest.style,
      }}
      id={id}
      loading={loading}
      ref={inputRef}
      notFoundContent={
        loading ? <Spin size="small" /> : fieldProps?.notFoundContent
      }
      fetchData={fetchData}
      resetData={resetData}
      request={request}
      fetchDataOnSearch={fetchDataOnSearch}
      placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
      label={label}
      {...fieldProps}
      options={options}
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
