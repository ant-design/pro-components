import type { SelectProps } from 'antd';
import { Spin } from 'antd';
import React, { MutableRefObject } from 'react';
import type { IntlType } from '../../../provider';
import type { ProFieldFC } from '../../types';
import LightSelect from './LightSelect';
import SearchSelect from './SearchSelect';
import { SelectHighlight } from './SelectHighlight';
import type { FieldSelectProps } from './types';

export type FieldSelectFullProps = FieldSelectProps &
  Pick<SelectProps, 'fieldNames' | 'style' | 'className'>;

type Props = Parameters<ProFieldFC<FieldSelectFullProps>>[0] & {
  intl: IntlType;
  loading: boolean;
  options: any[];
  fetchData: (keyWord?: string) => void;
  resetData: () => void;
  inputRef: React.RefObject<any>;
  keyWordsRef: MutableRefObject<string>;
  componentSize: string;
};

export function FieldSelectEdit(props: Props) {
  const {
    mode,
    formItemRender,
    fieldProps,
    light,
    id,
    label,
    variant,
    lightLabel,
    labelTrigger,
    intl,
    loading,
    options,
    fetchData,
    resetData,
    inputRef,
    keyWordsRef,
    componentSize,
    ...rest
  } = props;

  const renderDom = () => {
    if (light) {
      return (
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
    }
    return (
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
  };

  const dom = renderDom();
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
