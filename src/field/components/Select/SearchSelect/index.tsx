import type { SelectProps } from 'antd';
import { ConfigProvider, Select } from 'antd';
import { clsx } from 'clsx';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { RequestOptionsType } from '../../../../utils';
import { nanoid } from '../../../../utils';

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
  /** 自定义搜索方法, 返回搜索结果的 Promise */
  request?: (params: { query: string }) => Promise<DataValueType<T>[]>;
  /** 自定义选项渲染 */
  optionItemRender?: (item: DataValueType<T>) => React.ReactNode;
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

  /**
   * 当搜索关键词发生变化时是否请求远程数据
   *
   * @default true
   */
  fetchDataOnSearch?: boolean;

  /** 默认搜索关键词 */
  defaultSearchValue?: string;

  /**
   * 在选择时保留选项的原始标签文本
   * 当设置为 true 时，选中后回填的内容将使用选项的原始 label，而不是经过 optionItemRender 处理后的内容
   * @default false
   */
  preserveOriginalLabel?: boolean;
}

const SearchSelect = <T,>(props: SearchSelectProps<T[]>, ref: any) => {
  const {
    optionItemRender,
    mode,
    onSearch,
    onFocus,
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
    fetchData,
    resetData,
    prefixCls: customizePrefixCls,
    onClear,
    searchValue: propsSearchValue,
    showSearch,
    fieldNames,
    defaultSearchValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preserveOriginalLabel: _preserveOriginalLabel = false,
    ...restProps
  } = props;

  const {
    label: labelPropsName = 'label',
    value: valuePropsName = 'value',
    options: optionsPropsName = 'options',
  } = fieldNames || {};

  const [searchValue, setSearchValue] = useState(
    propsSearchValue ?? defaultSearchValue,
  );

  const selectRef = useRef<any>();

  useImperativeHandle(ref, () => selectRef.current);

  useEffect(() => {
    if (restProps.autoFocus) {
      selectRef?.current?.focus();
    }
  }, [restProps.autoFocus]);

  useEffect(() => {
    setSearchValue(propsSearchValue);
  }, [propsSearchValue]);

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const prefixCls = getPrefixCls('pro-filed-search-select', customizePrefixCls);

  // 兼容 renderXXX API。

  const classString = clsx(prefixCls, className, {
    [`${prefixCls}-disabled`]: disabled,
  });

  // 获取原始 label 的辅助函数
  const getOriginalLabel = (item: any, fallbackValue: any): string => {
    // 优先使用 dataItem.label（原始字符串），避免使用 value.label（可能是 optionItemRender 渲染的组件）
    if (item && typeof item.label === 'string' && item.label) {
      return item.label;
    }
    if (item && item.text && typeof item.text === 'string') {
      return item.text;
    }
    if (item && item.label) {
      return String(item.label);
    }
    if (item && item.text) {
      return String(item.text);
    }
    // 如果 dataItem 不存在，尝试从 value 中提取原始 label
    // 但 value.label 可能是组件，需要从组件中提取原始 label
    if (fallbackValue && fallbackValue.label) {
      // 如果是 React 元素（Highlight 组件），尝试提取其 props.label
      // 检查多种可能的 React 元素格式
      const labelValue = fallbackValue.label;
      if (
        (React.isValidElement(labelValue) ||
          (labelValue &&
            typeof labelValue === 'object' &&
            'props' in labelValue)) &&
        labelValue.props &&
        labelValue.props.label
      ) {
        return String(labelValue.props.label);
      }
      // 如果是字符串，直接返回
      if (typeof labelValue === 'string') {
        return labelValue;
      }
      // 最后尝试转换为字符串
      return String(labelValue);
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
          label: label,
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
        label: optionItemRender?.(item as any) || label,
      } as DefaultOptionType;
    });
  };
  return (
    <Select<any>
      ref={selectRef}
      className={classString}
      allowClear
      autoClearSearchValue={autoClearSearchValue}
      disabled={disabled}
      mode={mode}
      showSearch={showSearch}
      searchValue={searchValue}
      optionFilterProp={optionFilterProp}
      optionLabelProp={optionLabelProp}
      onClear={() => {
        onClear?.();
        fetchData(undefined);
        if (showSearch) {
          onSearch?.('');
          setSearchValue('');
        }
      }}
      {...restProps}
      filterOption={
        restProps.filterOption == false
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
                restProps.filterOption &&
                typeof restProps.filterOption === 'function'
              ) {
                return restProps.filterOption(effectiveSearchValue, {
                  ...option,
                  label: option?.data_title,
                });
              }
              return !!(
                option?.data_title
                  ?.toString()
                  .toLowerCase()
                  .includes(effectiveSearchValue.toLowerCase()) ||
                option?.[optionFilterProp as string]
                  ?.toString()
                  .toLowerCase()
                  .includes(effectiveSearchValue.toLowerCase())
              );
            }
      } // 这里使用pro-components的过滤逻辑
      onSearch={
        showSearch
          ? (value) => {
              if (fetchDataOnSearch) {
                fetchData(value);
              }
              onSearch?.(value);
              setSearchValue(value);
            }
          : undefined
      }
      onChange={(value, optionList, ...rest) => {
        // 将搜索框置空 和 antd 行为保持一致
        if (showSearch && autoClearSearchValue) {
          fetchData(undefined);
          onSearch?.('');
          setSearchValue('');
        } else if (showSearch && !autoClearSearchValue) {
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
        if (searchOnFocus) {
          // 当 searchOnFocus 为 true 时，应该清空搜索关键词以显示所有选项
          fetchData(undefined);
          // 同时清空搜索值
          if (showSearch) {
            onSearch?.('');
            setSearchValue('');
          }
        }
        onFocus?.(e);
      }}
      options={genOptions(options || [])}
    />
  );
};

export default React.forwardRef(SearchSelect);
