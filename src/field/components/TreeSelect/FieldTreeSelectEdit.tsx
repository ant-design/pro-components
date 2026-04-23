import type { GetRef } from 'antd';
import type { TreeSelectProps } from 'antd';
import { Spin, TreeSelect } from 'antd';
import { clsx } from 'clsx';
import React from 'react';
import type { IntlType, ProFieldFCRenderProps } from '../../../provider';
import { FieldLabel } from '../../../utils';
import type { TreeSelectFieldProps } from './types';

type TreeSelectShowSearchObject = Exclude<
  TreeSelectProps['showSearch'],
  boolean | undefined
>;

export interface FieldTreeSelectEditProps {
  text: string;
  mode: 'edit';
  formItemRender?: (
    text: any,
    props: ProFieldFCRenderProps,
    dom: React.JSX.Element,
  ) => React.JSX.Element;
  label?: React.ReactNode;
  variant?: React.ComponentProps<typeof FieldLabel>['variant'];
  fieldProps: TreeSelectFieldProps;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  treeSelectRef: React.RefObject<GetRef<typeof TreeSelect>>;
  intl: IntlType;
  loading: boolean;
  options: NonNullable<TreeSelectProps['treeData']>;
  fetchData: (keyWord?: string) => void;
  fetchDataOnSearch?: boolean;
  hasRequest: boolean;
  showSearch: TreeSelectProps['showSearch'];
  showSearchConfig: TreeSelectShowSearchObject | Record<string, never>;
  searchValue: string | undefined;
  setSearchValue: (
    updater:
      | string
      | undefined
      | ((prev: string | undefined) => string | undefined),
  ) => void;
  autoClearSearchValue: boolean | undefined;
  onClear?: () => void;
  treeSelectOnChange: TreeSelectProps<any>['onChange'];
  onBlur?: TreeSelectProps['onBlur'];
  layoutClassName: string;
}

/**
 * TreeSelect 编辑分支：仅应在 `mode === 'edit'` 时使用（非 `update`）。
 */
export function FieldTreeSelectEdit({
  text,
  mode,
  formItemRender,
  fieldProps,
  open,
  setOpen,
  treeSelectRef,
  intl,
  loading,
  options,
  fetchData,
  fetchDataOnSearch,
  hasRequest,
  showSearch,
  showSearchConfig,
  searchValue,
  setSearchValue,
  autoClearSearchValue,
  onClear,
  treeSelectOnChange,
  onBlur,
  layoutClassName,
}: FieldTreeSelectEditProps) {
  let dom: React.ReactNode = (
    <Spin spinning={loading}>
      <TreeSelect<string | undefined>
        open={open}
        onOpenChange={(isOpen) => {
          fieldProps?.onOpenChange?.(isOpen);
          setOpen(isOpen);
        }}
        ref={treeSelectRef}
        popupMatchSelectWidth
        placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
        {...fieldProps}
        treeData={options}
        showSearch={
          showSearch
            ? {
                ...showSearchConfig,
                searchValue: searchValue,
                autoClearSearchValue: autoClearSearchValue,
                onSearch: (value) => {
                  if (fetchDataOnSearch && hasRequest) {
                    fetchData(value);
                  }
                  setSearchValue(value);
                },
              }
            : showSearch
        }
        style={{
          minWidth: 60,
          ...fieldProps.style,
        }}
        allowClear={fieldProps.allowClear !== false}
        onClear={() => {
          onClear?.();
          fetchData(undefined);
          if (showSearch) {
            setSearchValue(undefined);
          }
        }}
        onChange={treeSelectOnChange}
        onBlur={(event) => {
          setSearchValue(undefined);
          fetchData(undefined);
          onBlur?.(event);
        }}
        className={clsx(fieldProps?.className, layoutClassName)}
      />
    </Spin>
  );

  if (formItemRender) {
    dom = formItemRender(
      text,
      { mode, ...(fieldProps as any), options, loading } as ProFieldFCRenderProps,
      dom as React.JSX.Element,
    );
  }

  return dom;
}
