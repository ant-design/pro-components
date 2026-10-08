import { useControlledState } from '@rc-component/util';
import type { SelectProps } from 'antd';
import { ConfigProvider, Select } from 'antd';
import { clsx } from 'clsx';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { RequestOptionsType } from '../../../../utils';
import { nanoid } from '../../../../utils/nanoid';

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

/**
 * 可做 String() 弱比较的基础类型
 * #8517: 对象 valueEnum 的数字 key 经 Object.entries 字符串化后,
 * option value ("2") 与业务数据值 (number 2) 严格相等失败,导致编辑态显示原始数字。
 */
type PrimitiveMatchableValue = string | number | boolean;

export interface SearchSelectProps<T = Record<string, any>> extends Omit<
  SelectProps<KeyLabel | KeyLabel[]>,
  'options'
> {
  /** 防抖动时间 默认10 单位ms */
  debounceTime?: number;
  /** 自定义搜索方法, 返回搜索结果的 Promise */
  request?: (params: { query: string }) => Promise<DataValueType<T>[]>;
  /** 指定组件中的值 */
  value?: KeyLabel | KeyLabel[];
  /** 指定默认选中的条目 */
  defaultValue?: KeyLabel | KeyLabel[];

  options?: RequestOptionsType[];

  /**
   * 样式
   *
   * @ignore
   */
  style?: React.CSSProperties;
  /**
   * ClassName 类名
   *
   * @ignore
   */
  className?: string;
  /**
   * Placeholder 输入提示
   *
   * @default 请输入关键字搜索
   */
  placeholder?: string;
  /**
   * 是否在输入框聚焦时触发搜索
   *
   * @default false
   */
  searchOnFocus?: boolean;
  /**
   * 选择完一个之后是否清空搜索项重新搜索
   *
   * @default false
   */
  resetAfterSelect?: boolean;
  /**
   * 自定义前缀
   *
   * @ignore
   */
  prefixCls?: string;

  /** 刷新数据 */
  fetchData: (keyWord?: string) => void;

  /** 清空数据 */
  resetData: () => void;

  /** 上层 useFieldFetchData 是否有 request 驱动 */
  hasRemoteRequest?: boolean;

  /**
   * 当搜索关键词发生变化时是否请求远程数据
   *
   * @default true
   */
  fetchDataOnSearch?: boolean;

  /** 默认搜索关键词 */
  defaultSearchValue?: string;
}

const SearchSelect = <T,>(props: SearchSelectProps<T[]>, ref: any) => {
  const {
    mode,
    onSearch,
    onFocus,
    onBlur,
    onChange,
    autoClearSearchValue = true,
    searchOnFocus = false,
    resetAfterSelect = false,
    fetchDataOnSearch = true,
    optionFilterProp = 'label',
    optionLabelProp = 'label',
    className,
    disabled,
    options,
    hasRemoteRequest = false,
    fetchData,
    resetData,
    prefixCls: customizePrefixCls,
    onClear,
    searchValue: propsSearchValue,
    showSearch,
    fieldNames,
    defaultSearchValue,
    ...restProps
  } = props;
  const showSearchConfig =
    typeof showSearch === 'object' ? showSearch : undefined;
  const effectiveAutoClearSearchValue =
    showSearchConfig?.autoClearSearchValue ?? autoClearSearchValue;
  const effectiveOptionFilterProp =
    showSearchConfig?.optionFilterProp ?? optionFilterProp;
  const effectiveOnSearch = showSearchConfig?.onSearch ?? onSearch;
  const effectiveFilterOption =
    showSearchConfig?.filterOption ?? restProps.filterOption;

  const {
    label: labelPropsName = 'label',
    value: valuePropsName = 'value',
    options: optionsPropsName = 'options',
  } = fieldNames || {};

  const [searchValue, setSearchValue] = useControlledState(
    defaultSearchValue,
    showSearchConfig?.searchValue ?? propsSearchValue,
  );
  const [focused, setFocused] = useState(Boolean(restProps.autoFocus));

  const selectRef = useRef<any>();

  useImperativeHandle(ref, () => selectRef.current);

  useEffect(() => {
    if (restProps.autoFocus) {
      selectRef?.current?.focus();
    }
  }, [restProps.autoFocus]);

  // #8801:受控 searchValue 变化时同步触发 request(keyWords) 重新请求。
  // 仅响应外部 prop 变化:初次挂载(searchValue 为 undefined)跳过;
  // 用户输入路径已由 onSearch → fetchData 覆盖,这里负责编程式更新
  // (如下拉收起时外部清空搜索词,期望以 keyWords='' 重新拉取全量数据)。
  const controlledSearchValue =
    showSearchConfig?.searchValue ?? propsSearchValue;
  const lastControlledSearchValue = useRef(
    controlledSearchValue ?? defaultSearchValue,
  );
  useEffect(() => {
    if (controlledSearchValue === lastControlledSearchValue.current) return;
    lastControlledSearchValue.current = controlledSearchValue;
    // 本地 options 也依赖 useFieldFetchData 的 keyWords 做过滤；没有远程
    // request 时可直接同步。远程 request 仍尊重 fetchDataOnSearch=false。
    if (fetchDataOnSearch || !hasRemoteRequest) {
      fetchData?.(controlledSearchValue);
    }
  }, [controlledSearchValue, fetchData, fetchDataOnSearch, hasRemoteRequest]);

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const prefixCls = getPrefixCls('pro-filed-search-select', customizePrefixCls);

  // 兼容 renderXXX API。

  const classString = clsx(prefixCls, className, {
    [`${prefixCls}-disabled`]: disabled,
  });

  // 获取原始 label 的辅助函数
  const getOriginalLabel = (item: any, fallbackValue: any): string => {
    // 优先使用 dataItem.label（原始字符串），避免使用 value.label（可能是 optionItemRender 渲染的组件）
    if (item?.label && typeof item.label === 'string') {
      return item.label;
    }
    if (item?.text && typeof item.text === 'string') {
      return item.text;
    }
    if (item?.label) {
      return String(item.label);
    }
    if (item?.text) {
      return String(item.text);
    }
    // 如果 dataItem 不存在，尝试从 value 中提取原始 label
    if (fallbackValue?.label) {
      return fallbackValue.label;
    }
    return '';
  };

  const getMergeValue: SelectProps<any>['onChange'] = (value, option) => {
    if (Array.isArray(value) && Array.isArray(option) && value.length > 0) {
      // 多选情况且用户有选择

      return value.map((item, index) => {
        const optionItem = (option as DefaultOptionType[])?.[
          index
        ] as DefaultOptionType;
        const dataItem = optionItem?.['data-item'];
        const originalLabel = getOriginalLabel(dataItem, item);

        return {
          ...(dataItem || {}),
          ...item,
          label: originalLabel || item.label,
        };
      });
    }
    return [];
  };

  /**
   * #8517: 收集全部叶子选项的 value,用于对受控 value 做弱匹配修正。
   * 仅当严格匹配不存在、但 String() 弱匹配存在时才替换,保证:
   * - value 与 option 类型一致的老用法完全不受影响;
   * - 只影响回显(label 解析),不改变 onChange 输出与表单提交值。
   */
  const flatOptionValues = useMemo(() => {
    const values = new Map<string, PrimitiveMatchableValue>();
    const traverse = (opts: RequestOptionsType[]) => {
      opts?.forEach((item) => {
        const itemValue = item[valuePropsName];
        if (
          item.options &&
          (item.optionType === 'optGroup' || (item.options as any)?.length)
        ) {
          traverse(item.options);
          return;
        }
        if (
          typeof itemValue === 'string' ||
          typeof itemValue === 'number' ||
          typeof itemValue === 'boolean'
        ) {
          // 首个出现的优先(与 Select 选中匹配顺序一致)
          if (!values.has(String(itemValue))) {
            values.set(String(itemValue), itemValue);
          }
        }
      });
    };
    traverse(options || []);
    return values;
  }, [options, valuePropsName]);

  /** #8517: 弱匹配修正单个 value(见 flatOptionValues 注释) */
  const alignValueToOptions = (
    value: unknown,
  ): PrimitiveMatchableValue | undefined => {
    if (
      typeof value !== 'string' &&
      typeof value !== 'number' &&
      typeof value !== 'boolean'
    ) {
      return undefined;
    }
    // 严格相等命中时不需要修正
    if ([...flatOptionValues.values()].includes(value)) return value;
    const coerced = flatOptionValues.get(String(value));
    return coerced;
  };

  /** #8517: 对受控 value(单选/多选)做弱匹配修正,仅影响回显 */
  const alignedValue = useMemo(() => {
    const { value: propsValue } = restProps;
    if (propsValue == null) return propsValue;
    if (Array.isArray(propsValue)) {
      const aligned = propsValue.map((item) => {
        const result = alignValueToOptions(item);
        return result === undefined ? item : result;
      });
      // 全部未命中时保持原值,避免产生新引用触发多余渲染
      return aligned.every((item, i) => item === propsValue[i])
        ? propsValue
        : aligned;
    }
    const result = alignValueToOptions(propsValue);
    return result === undefined ? propsValue : result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restProps.value, flatOptionValues]);

  const genOptions = (
    mapOptions: RequestOptionsType[],
  ): DefaultOptionType[] => {
    return mapOptions.map((item, index) => {
      const {
        className: itemClassName,
        optionType,
        ...resetItem
      } = item as RequestOptionsType;

      // 获取 label，优先使用 labelPropsName，如果没有则使用 text（valueEnum 的情况）
      const label = item[labelPropsName] ?? item.text;
      const value = item[valuePropsName];
      const itemOptions = item[optionsPropsName] ?? [];

      if (optionType === 'optGroup' || item.options) {
        return {
          label,
          ...resetItem,
          data_title: label,
          title: label,
          key: value ?? `${label?.toString()}-${index}-${nanoid()}`, // 防止因key相同导致虚拟滚动出问题
          children: genOptions(itemOptions),
        } as DefaultOptionType;
      }

      return {
        title: label,
        ...resetItem,
        data_title: label,
        value: value ?? index,
        key: value ?? `${label?.toString()}-${index}-${nanoid()}`,
        'data-item': item,
        className: `${prefixCls}-option ${itemClassName || ''}`.trim(),
        label,
      } as DefaultOptionType;
    });
  };
  const handleSearch = showSearch
    ? (value: string) => {
        if (fetchDataOnSearch) {
          fetchData(value);
        }
        effectiveOnSearch?.(value);
        setSearchValue(value);
      }
    : undefined;

  return (
    <Select<any>
      ref={selectRef}
      className={classString}
      allowClear
      autoClearSearchValue={effectiveAutoClearSearchValue}
      disabled={disabled}
      mode={mode}
      showSearch={
        showSearchConfig
          ? { ...showSearchConfig, onSearch: handleSearch }
          : showSearch
      }
      searchValue={
        mode === 'multiple' && !effectiveAutoClearSearchValue && !focused
          ? ''
          : searchValue
      }
      optionFilterProp={effectiveOptionFilterProp}
      optionLabelProp={optionLabelProp}
      onClear={() => {
        onClear?.();
        fetchData(undefined);
        if (showSearch) {
          effectiveOnSearch?.('');
          setSearchValue('');
        }
      }}
      {...restProps}
      // #8517: 弱匹配修正后的回显 value(仅回显,onChange/提交值保持用户数据类型)
      value={alignedValue}
      filterOption={
        effectiveFilterOption == false
          ? false
          : (inputValue, option) => {
              // 当 inputValue 为空或 searchValue 为空时，显示所有选项
              // 这样可以确保 searchOnFocus 时能够显示所有选项
              const effectiveSearchValue =
                searchValue === '' ? '' : inputValue || searchValue;
              if (!effectiveSearchValue) {
                return true;
              }
              if (
                effectiveFilterOption &&
                typeof effectiveFilterOption === 'function'
              ) {
                return effectiveFilterOption(effectiveSearchValue, {
                  ...option,
                  label: option?.data_title,
                });
              }
              const optionFilterProps = Array.isArray(effectiveOptionFilterProp)
                ? effectiveOptionFilterProp
                : [effectiveOptionFilterProp];
              return !!(
                option?.data_title
                  ?.toString()
                  .toLowerCase()
                  .includes(effectiveSearchValue.toLowerCase()) ||
                option?.[valuePropsName]
                  ?.toString()
                  .toLowerCase()
                  .includes(effectiveSearchValue.toLowerCase()) ||
                optionFilterProps.some((filterProp) =>
                  option?.[filterProp as string]
                    ?.toString()
                    .toLowerCase()
                    .includes(effectiveSearchValue.toLowerCase()),
                )
              );
            }
      } // 这里使用pro-components的过滤逻辑
      onSearch={handleSearch}
      onChange={(value, optionList, ...rest) => {
        // 将搜索框置空 和 antd 行为保持一致
        if (showSearch && effectiveAutoClearSearchValue) {
          // #8780/#8928:选中值后清空搜索词,仅当之前确实有搜索词时才重新请求。
          // keyWords 本来就是空(未输入直接选择)时再触发 fetchData(undefined)
          // 只会产生一次与挂载时完全相同的多余 request。
          if (searchValue) {
            fetchData(undefined);
          }
          effectiveOnSearch?.('');
          setSearchValue('');
        } else if (showSearch && !effectiveAutoClearSearchValue) {
          // 当 autoClearSearchValue 为 false 时，保持搜索值不变
          // 但是需要确保我们的状态与 Ant Design 的内部状态同步
          // 在 multiple 模式下，Ant Design 可能会自动清除搜索值，我们需要重新设置它
          if (mode === 'multiple') {
            // 在 multiple 模式下，即使 autoClearSearchValue 为 false，
            // Ant Design 仍可能会清除搜索值，这是正常行为
            // 我们不需要做任何特殊处理，让 Ant Design 自然处理
          }
        }

        if (!props.labelInValue) {
          onChange?.(value, optionList, ...rest);
          return;
        }

        if (mode !== 'multiple' && !Array.isArray(optionList)) {
          // 单选情况且用户选择了选项
          let dataItem = optionList && optionList['data-item'];

          // 如果 dataItem 不存在，尝试从 options 中查找对应的原始数据
          let foundDataItem = dataItem;
          if (!foundDataItem && value && options) {
            const optionValue = value[valuePropsName] ?? value.value;
            const findDataItem = (opts: RequestOptionsType[]): any => {
              for (const opt of opts) {
                const optValue = opt[valuePropsName] ?? opt.value;
                if (optValue === optionValue) {
                  return opt;
                }
                if (opt[optionsPropsName] || opt.options) {
                  const found = findDataItem(
                    opt[optionsPropsName] || opt.options || [],
                  );
                  if (found) return found;
                }
              }
              return null;
            };
            foundDataItem = findDataItem(options);
          }

          // 如果value值为空则是清空时产生的回调,直接传值就可以了
          if (!value || !foundDataItem) {
            const originalLabel = getOriginalLabel(foundDataItem, value);
            const changedValue = value
              ? {
                  ...value,
                  label: originalLabel,
                }
              : value;
            onChange?.(changedValue, optionList, ...rest);
          } else {
            // 确保使用 dataItem.label（原始字符串），避免使用 value.label（可能是 optionItemRender 渲染的组件）
            const originalLabel = getOriginalLabel(foundDataItem, value);
            onChange?.(
              {
                ...value,
                ...foundDataItem,
                label: originalLabel,
              },
              optionList,
              ...rest,
            );
          }
          return;
        }
        // 合并值
        const mergeValue = getMergeValue(value, optionList) as any;
        onChange?.(mergeValue, optionList, ...rest);

        // 将搜索结果置空，重新搜索
        if (resetAfterSelect) resetData();
      }}
      onFocus={(e) => {
        setFocused(true);
        if (searchOnFocus) {
          // 当 searchOnFocus 为 true 时，应该清空搜索关键词以显示所有选项
          fetchData(undefined);
          // 同时清空搜索值
          if (showSearch) {
            effectiveOnSearch?.('');
            setSearchValue('');
          }
        }
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      options={genOptions(options || [])}
    />
  );
};

export default React.forwardRef(SearchSelect);
