import type { GetRef, SelectProps } from 'antd';
import { Select, Spin } from 'antd';
import React, { useMemo } from 'react';
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
    fetchDataOnSearch,
    ...rest
  } = props;

  const normalizedOptions = useMemo(() => {
    const currentValue = fieldProps?.value;
    const selectedNumericValues = new Set(
      (Array.isArray(currentValue) ? currentValue : [currentValue]).filter(
        (value): value is number => typeof value === 'number',
      ),
    );
    if (!selectedNumericValues.size) return options;

    const valueKey = fieldProps?.fieldNames?.value ?? 'value';
    const childrenKey = fieldProps?.fieldNames?.options ?? 'options';
    const normalize = (items: RequestOptionsType[]): RequestOptionsType[] => {
      const numericValues = new Set(
        items
          .map((item) => item[valueKey])
          .filter((value): value is number => typeof value === 'number'),
      );
      return items.map((item) => {
        const rawValue = item[valueKey];
        const nested = item[childrenKey] ?? item.children;
        const numericValue = Number(rawValue);
        const canNormalize =
          typeof rawValue === 'string' &&
          rawValue !== '' &&
          String(numericValue) === rawValue &&
          selectedNumericValues.has(numericValue) &&
          !numericValues.has(numericValue);
        return {
          ...item,
          ...(canNormalize ? { [valueKey]: numericValue } : {}),
          ...(Array.isArray(nested)
            ? { [childrenKey]: normalize(nested) }
            : {}),
        };
      });
    };
    return normalize(options);
  }, [fieldProps?.fieldNames, fieldProps?.value, options]);

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
      allowClear
      defaultSearchValue={props.defaultKeyWords}
      notFoundContent={
        loading ? <Spin size="small" /> : fieldProps?.notFoundContent
      }
      fetchData={fetchData}
      resetData={resetData}
      placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
      label={label}
      {...fieldProps}
      fetchDataOnSearch={fieldProps?.fetchDataOnSearch ?? fetchDataOnSearch}
      options={normalizedOptions}
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
