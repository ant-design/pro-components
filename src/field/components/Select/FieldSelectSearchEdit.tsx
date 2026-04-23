import type { GetRef, SelectProps } from 'antd';
import { Select, Spin } from 'antd';
import React, { MutableRefObject } from 'react';
import type { IntlType } from '../../../provider';
import type { RequestOptionsType } from '../../../utils';
import type { ProFieldFC } from '../../types';
import SearchSelect from './SearchSelect';
import { SelectHighlight } from './SelectHighlight';
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
  keyWordsRef: MutableRefObject<string>;
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
    keyWordsRef,
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
      allowClear
      defaultSearchValue={props.defaultKeyWords}
      notFoundContent={
        loading ? <Spin size="small" /> : fieldProps?.notFoundContent
      }
      fetchData={(keyWord) => {
        keyWordsRef.current = keyWord ?? '';
        fetchData(keyWord);
        if (keyWord === undefined) {
          keyWordsRef.current = '';
        }
      }}
      resetData={resetData}
      optionItemRender={(item) => {
        if (typeof item.label === 'string' && keyWordsRef.current) {
          return (
            <SelectHighlight
              label={item.label}
              words={[keyWordsRef.current]}
            />
          );
        }
        return item.label;
      }}
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
