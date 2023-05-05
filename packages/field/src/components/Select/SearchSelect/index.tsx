import type { RequestOptionsType } from '@ant-design/pro-utils';
import type { SelectProps } from 'antd';
import { ConfigProvider, Select } from 'antd';

import type { LabeledValue } from 'antd/lib/select';
import classNames from 'classnames';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

const { Option, OptGroup } = Select;

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

  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-disabled`]: disabled,
  });

  const getMergeValue: SelectProps<any>['onChange'] = (value, option) => {
    if (Array.isArray(value) && value.length > 0) {
      // 多选情况且用户有选择
      return value.map((item, index) => {
        const optionItem = option?.[index];
        const dataItem = optionItem?.['data-item'] || {};
        return {
          ...dataItem,
          ...item,
        };
      });
    }
    return [];
  };

  const renderOptions = (mapOptions: RequestOptionsType[]) => {
    return mapOptions.map((item) => {
      const {
        disabled: itemDisable,
        className: itemClassName,
        optionType,
      } = item as RequestOptionsType;

      const label = item[labelPropsName];
      const value = item[valuePropsName];
      const itemOptions = item[optionsPropsName] ?? [];

      if (optionType === 'optGroup' || item.options) {
        return (
          <OptGroup key={value} label={label}>
            {renderOptions(itemOptions)}
          </OptGroup>
        );
      }

      return (
        <Option
          {...item}
          value={value!}
          key={value || label?.toString()}
          disabled={itemDisable}
          data-item={item}
          className={`${prefixCls}-option ${itemClassName || ''}`}
          label={label}
        >
          {optionItemRender?.(item as any) || label}
        </Option>
      );
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
          setSearchValue(undefined);
        }
      }}
      {...restProps}
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
          setSearchValue(undefined);
        }

        if (!props.labelInValue) {
          onChange?.(value, optionList, ...rest);
          return;
        }

        if (mode !== 'multiple') {
          // 单选情况且用户选择了选项
          const dataItem = optionList && optionList['data-item'];
          // 如果value值为空则是清空时产生的回调,直接传值就可以了
          if (!value || !dataItem) {
            onChange?.(value, optionList, ...rest);
          } else {
            onChange?.({ ...value, ...dataItem }, optionList, ...rest);
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
    >
      {renderOptions(options || [])}
    </Select>
  );
};

export default React.forwardRef(SearchSelect);
