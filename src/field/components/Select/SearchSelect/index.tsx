import type { GetRef, SelectProps } from 'antd';
import { ConfigProvider, Select } from 'antd';
import { clsx } from 'clsx';
import { isObject } from 'lodash-es';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import type { RequestOptionsType } from '../../../../utils';

export type LabeledValue = {
  key?: string;
  label: React.ReactNode;
  value: string | number;
};

export type DefaultOptionType = NonNullable<SelectProps['options']>[number];

// 支持 key, value, label，兼容 UserSearch 中只填写了 key 的情况。
export type KeyLabel = Partial<LabeledValue> & RequestOptionsType;

/** 用户扩展数据后的值类型 */
export type DataValueType<T> = KeyLabel & T;

/** 可能单选，可能多选 */
export type DataValuesType<T> = DataValueType<T> | DataValueType<T>[];

export interface SearchSelectProps<T = Record<string, any>> extends Omit<
  SelectProps<KeyLabel | KeyLabel[]>,
  'options'
> {
  /** 防抖动时间 默认10 单位ms */
  debounceTime?: number;
  /** 是否存在远程数据源（用于决定是否关闭本地过滤） */
  hasRequest?: boolean;
  /** 指定组件中的值 */
  value?: KeyLabel | KeyLabel[];
  /** 指定默认选中的条目 */
  defaultValue?: KeyLabel | KeyLabel[];
  options: RequestOptionsType[];
  /**
   * 样式
   */
  style?: React.CSSProperties;
  /**
   * ClassName 类名
   */
  className?: string;
  /**
   * Placeholder 输入提示
   * @default 请输入关键字搜索
   */
  placeholder?: string;
  /**
   * 是否在输入框聚焦时触发搜索
   * @default false
   */
  searchOnFocus?: boolean;
  /**
   * 选择完一个之后是否清空搜索项重新搜索
   * @default false
   */
  resetAfterSelect?: boolean;
  /**
   * 自定义前缀
   * @ignore
   */
  prefixCls?: string;
  /** 刷新数据 */
  fetchData: (keyWord?: string) => void;
  /** 清空数据 */
  resetData: () => void;
  /**
   * 当搜索关键词发生变化时是否请求远程数据
   */
  fetchDataOnSearch?: boolean;
}

type SearchSelectRef = GetRef<typeof Select>;

const SearchSelect: React.ForwardRefRenderFunction<
  SearchSelectRef,
  SearchSelectProps
> = (props, ref) => {
  const {
    onFocus,
    onChange,
    searchOnFocus = false,
    resetAfterSelect = false,
    fetchDataOnSearch,
    className,
    disabled,
    options,
    fetchData,
    resetData,
    prefixCls: customizePrefixCls,
    onClear,
    showSearch: _showSearch,
    hasRequest,
    ...restProps
  } = props;

  const selectRef = useRef<SearchSelectRef>(null);
  useImperativeHandle(ref, () => selectRef.current!);

  useEffect(() => {
    if (restProps.autoFocus) {
      selectRef.current?.focus();
    }
  }, [restProps.autoFocus]);

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-filed-search-select', customizePrefixCls);
  // 兼容 renderXXX API。
  const classString = clsx(prefixCls, className, {
    [`${prefixCls}-disabled`]: disabled,
  });

  const showSearch = useMemo(() => {
    if (!_showSearch) return _showSearch;
    const userConfig = isObject(_showSearch) ? _showSearch : {};
    const {
      optionFilterProp = 'label',
      onSearch,
      filterOption: _filterOption,
    } = userConfig;

    // 存在远程数据源且 fetchDataOnSearch 为 true 时，搜索走远程请求，结果已由服务端过滤，关闭本地过滤；
    // 其余情况（无 request 或 fetchDataOnSearch 为 false）沿用 _filterOption，由 antd 进行本地过滤
    const filterOption =
      hasRequest && fetchDataOnSearch ? false : _filterOption;

    return {
      ...userConfig,
      optionFilterProp,
      filterOption,
      onSearch: (value: string) => {
        if (fetchDataOnSearch) {
          fetchData(value);
        }
        onSearch?.(value);
      },
    };
  }, [_showSearch, fetchDataOnSearch, fetchData, hasRequest]);
  return (
    <Select
      ref={selectRef}
      className={classString}
      disabled={disabled}
      showSearch={showSearch}
      onClear={() => {
        onClear?.();
        if (isObject(showSearch) && showSearch.onSearch) {
          showSearch.onSearch('');
        }
      }}
      {...restProps}
      onChange={(value, optionList, ...rest) => {
        // 将搜索框置空 和 antd 行为保持一致
        if (isObject(showSearch) && showSearch.autoClearSearchValue) {
          showSearch.onSearch('');
        }
        onChange?.(value, optionList, ...rest);
        if (resetAfterSelect) resetData();
      }}
      onFocus={(e) => {
        if (searchOnFocus && isObject(showSearch)) {
          showSearch.onSearch('');
        }
        onFocus?.(e);
      }}
      options={options}
    />
  );
};

export default React.forwardRef(SearchSelect);
