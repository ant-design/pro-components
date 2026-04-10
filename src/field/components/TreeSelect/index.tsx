import { omit, useControlledState } from '@rc-component/util';
import type { TreeSelectProps } from 'antd';
import { ConfigProvider } from 'antd';
import React, {
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOnlyMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import type { FieldSelectProps } from '../Select';
import { useFieldFetchData } from '../Select';
import { FieldTreeSelectEdit } from './FieldTreeSelectEdit';
import { FieldTreeSelectRead } from './FieldTreeSelectRead';
import type { TreeSelectFieldProps } from './types';

export type { TreeSelectFieldProps };
/**
 * Tree select
 * A function that returns a React component.

 * @param formItemRender
 * @param mode
 * @param light
 * @param label
 * @param render
 * @param propsVariant
 * @param rest
 * @param ref
 */
const FieldTreeSelect: ProFieldFC<{} & FieldSelectProps> = (
  {
    formItemRender,
    mode,
    light,
    label,
    render,
    variant: propsVariant,
    ...rest
  },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const layoutClassName = getPrefixCls('pro-field-tree-select');
  const treeSelectRef = useRef(null);
  const [open, setOpen] = useState(false);

  const {
    onClear,
    onChange: propsOnChange,
    onBlur,
    showSearch,
    fetchDataOnSearch,
    onSearch: propsOnSearch,
    autoClearSearchValue: propsAutoClearSearchValue,
    searchValue: propsSearchValueProp,
    ...fieldProps
  } = omit(rest.fieldProps, ['treeData']) as TreeSelectFieldProps;
  const showSearchConfig = typeof showSearch === 'object' ? showSearch : {};

  const onSearch =
    showSearchConfig?.onSearch !== undefined
      ? showSearchConfig.onSearch
      : propsOnSearch;
  //兼容过时API autoClearSearchValue
  const autoClearSearchValue =
    showSearchConfig?.autoClearSearchValue !== undefined
      ? showSearchConfig.autoClearSearchValue
      : propsAutoClearSearchValue;
  //兼容过时API searchValue
  const propsSearchValue =
    showSearchConfig?.searchValue !== undefined
      ? showSearchConfig.searchValue
      : propsSearchValueProp;

  const variant = propsVariant ?? (fieldProps as any)?.variant;

  const intl = useIntl();

  const [loading, options, fetchData] = useFieldFetchData({
    ...rest,
    defaultKeyWords: propsSearchValue,
  });

  const [searchValue, setSearchValueInner] = useControlledState<
    string | undefined
  >(undefined, propsSearchValue);
  const setSearchValue = useCallback(
    (
      updater:
        | string
        | undefined
        | ((prev: string | undefined) => string | undefined),
    ) => {
      setSearchValueInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: string | undefined) => string | undefined)(prev)
            : updater;
        (onSearch as (v?: string) => void)?.(next);
        return next;
      });
    },
    [onSearch],
  );

  useImperativeHandle(ref, () => ({
    ...(treeSelectRef.current || {}),
    fetchData: (keyWord: string) => fetchData(keyWord),
  }));

  const optionsValueEnum = useMemo(() => {
    if (!isProFieldReadMode(mode)) return;
    /**
     * Support TreeSelect fieldNames
     * @see https://ant.design/components/tree-select-cn
     */
    const {
      value: valuePropsName = 'value',
      label: labelPropsName = 'label',
      children: childrenPropsName = 'children',
    } = fieldProps?.fieldNames || {};

    const valuesMap = new Map();

    const traverseOptions = (_options: typeof options) => {
      if (!_options?.length) {
        return valuesMap;
      }

      const length = _options.length;
      let i = 0;
      while (i < length) {
        const cur = _options[i++];
        valuesMap.set(cur[valuePropsName], cur[labelPropsName]);
        traverseOptions(cur[childrenPropsName]);
      }
      return valuesMap;
    };

    return traverseOptions(options);
  }, [fieldProps?.fieldNames, mode, options]);

  const onChange: TreeSelectProps<any>['onChange'] = (
    value,
    optionList,
    extra,
  ) => {
    // 将搜索框置空 和 antd 行为保持一致
    if (showSearch && autoClearSearchValue) {
      fetchData(undefined);
      setSearchValue(undefined);
    }
    propsOnChange?.(value, optionList, extra);
  };

  if (isProFieldReadMode(mode)) {
    return (
      <FieldTreeSelectRead
        formItemRender={formItemRender}
        mode={mode}
        light={light}
        label={label}
        render={render}
        variant={propsVariant}
        optionsValueEnum={optionsValueEnum}
        options={options}
        {...rest}
      />
    );
  }
  if (isProFieldEditOnlyMode(mode)) {
    return (
      <FieldTreeSelectEdit
        text={rest.text as string}
        mode="edit"
        formItemRender={formItemRender}
        light={light}
        label={label}
        variant={variant}
        fieldProps={fieldProps}
        open={open}
        setOpen={setOpen}
        treeSelectRef={treeSelectRef}
        intl={intl}
        loading={loading}
        options={options}
        fetchData={fetchData}
        fetchDataOnSearch={fetchDataOnSearch}
        hasRequest={!!rest.request}
        showSearch={showSearch}
        showSearchConfig={showSearchConfig}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        autoClearSearchValue={autoClearSearchValue}
        onClear={onClear}
        treeSelectOnChange={onChange}
        onBlur={onBlur}
        layoutClassName={layoutClassName}
      />
    );
  }

  return null;
};

export default React.forwardRef(FieldTreeSelect);
