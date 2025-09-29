import type { SelectProps } from 'antd';
import { ConfigProvider, Select } from 'antd';
import type { DefaultOptionType, LabeledValue } from 'antd/es/select';
import classNames from 'classnames';
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { RequestOptionsType } from '../../../../utils';
import { nanoid } from '../../../../utils';

// 支持 key, value, label，兼容 UserSearch 中只填写了 key 的情况。
export type KeyLabel = Partial<LabeledValue> & RequestOptionsType;

/** 用户扩展数据后的值类型 */
export type DataValueType<T> = KeyLabel & T;

/** 可能单选，可能多选 */
export type DataValuesType<T> = DataValueType<T> | DataValueType<T>[];

export interface SearchSelectProps<T = Record<string, any>>
  extends Omit<SelectProps<KeyLabel | KeyLabel[]>, 'options'> {
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

  ref?: React.Ref<any>;
}

const SearchSelect = <T,>({ ref, ...props }: SearchSelectProps<T[]>) => {
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
    preserveOriginalLabel = false,
    ...restProps
  } = props;

  const {
    label: labelPropsName = 'label',
    value: valuePropsName = 'value',
    options: optionsPropsName = 'options',
  } = fieldNames || {};

  const [searchValue, setSearchValue] = useState(propsSearchValue ?? defaultSearchValue);

  const selectRef = useRef<any>(undefined);

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

  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-disabled`]: disabled,
  });

  const getMergeValue: SelectProps<any>['onChange'] = (value, option) => {
    if (Array.isArray(value) && Array.isArray(option) && value.length > 0) {
      // 多选情况且用户有选择

      return value.map((item, index) => {
        const optionItem = (option as DefaultOptionType[])?.[index] as DefaultOptionType;
        const dataItem = optionItem?.['data-item'];

        return {
          ...(dataItem || {}),
          ...item,
          label: preserveOriginalLabel && dataItem ? dataItem.label : item.label,
        };
      });
    }
    return [];
  };

  const genOptions = (mapOptions: RequestOptionsType[]): DefaultOptionType[] => {
    return mapOptions.map((item, index) => {
      const { className: itemClassName, optionType, ...resetItem } = item as RequestOptionsType;

      const label = item[labelPropsName];
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
      allowClear
      autoClearSearchValue={autoClearSearchValue}
      className={classString}
      disabled={disabled}
      mode={mode}
      optionFilterProp={optionFilterProp}
      optionLabelProp={optionLabelProp}
      searchValue={searchValue}
      showSearch={showSearch}
      onClear={() => {
        onClear?.();
        fetchData(undefined);
        if (showSearch) {
          setSearchValue(undefined);
        }
      }}
      {...restProps}
      filterOption={
        restProps.filterOption == false
          ? false
          : (inputValue, option) => {
              if (restProps.filterOption && typeof restProps.filterOption === 'function') {
                return restProps.filterOption(inputValue, {
                  ...option,
                  label: option?.data_title,
                });
              }
              return !!(
                option?.data_title?.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
                option?.[optionFilterProp]?.toString().toLowerCase().includes(inputValue.toLowerCase())
              );
            }
      } // 这里使用pro-components的过滤逻辑
      options={genOptions(options || [])}
      onChange={(value, optionList, ...rest) => {
        // 将搜索框置空 和 antd 行为保持一致
        if (showSearch && autoClearSearchValue) {
          fetchData(undefined);
          onSearch?.('');
          setSearchValue(undefined);
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
          const dataItem = optionList && optionList['data-item'];
          // 如果value值为空则是清空时产生的回调,直接传值就可以了
          if (!value || !dataItem) {
            const changedValue = value
              ? {
                  ...value,
                  // 这里有一种情况，如果用户使用了 request和labelInValue，保存之后，刷新页面，正常回显，但是再次添加会出现 label 丢失的情况。所以需要兼容
                  label: preserveOriginalLabel && dataItem ? dataItem?.label || value.label : value.label,
                }
              : value;
            onChange?.(changedValue, optionList, ...rest);
          } else {
            onChange?.(
              {
                ...value,
                ...dataItem,
                label: preserveOriginalLabel && dataItem ? dataItem.label : value.label,
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
          fetchData(searchValue);
        }
        onFocus?.(e);
      }}
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
    />
  );
};

export default SearchSelect;
