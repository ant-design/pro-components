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

  const { normalizedOptions, normalizedValue } = useMemo(() => {
    const currentValue = fieldProps?.value;
    const sample = Array.isArray(currentValue) ? currentValue[0] : currentValue;
    if (typeof sample !== 'number') {
      return { normalizedOptions: options, normalizedValue: currentValue };
    }

    const valueKey = fieldProps?.fieldNames?.value ?? 'value';
    const childrenKey = fieldProps?.fieldNames?.options ?? 'options';
    const normalizedStringValues = new Map<string, number>();
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
          !numericValues.has(numericValue);
        if (canNormalize) normalizedStringValues.set(rawValue, numericValue);
        return {
          ...item,
          ...(canNormalize ? { [valueKey]: numericValue } : {}),
          ...(Array.isArray(nested)
            ? { [childrenKey]: normalize(nested) }
            : {}),
        };
      });
    };
    const nextOptions = normalize(options);
    const normalizeSelectedValue = (value: unknown) =>
      typeof value === 'string' && normalizedStringValues.has(value)
        ? normalizedStringValues.get(value)
        : value;
    return {
      normalizedOptions: nextOptions,
      normalizedValue: Array.isArray(currentValue)
        ? currentValue.map(normalizeSelectedValue)
        : normalizeSelectedValue(currentValue),
    };
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
      value={normalizedValue}
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
