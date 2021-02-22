import { useContext } from 'react';
import React from 'react';
import type { SelectProps } from 'antd';
import { Select, ConfigProvider } from 'antd';
import classNames from 'classnames';
import type { LabeledValue } from 'antd/es/select';

const { Option } = Select;

// 支持 key, value, label，兼容 UserSearch 中只填写了 key 的情况。
export type KeyLabel = Partial<LabeledValue>;

/** 用户扩展数据后的值类型 */
export type DataValueType<T> = KeyLabel & T;

/** 可能单选，可能多选 */
export type DataValuesType<T> = DataValueType<T> | DataValueType<T>[];

export interface SearchSelectProps<T = {}>
  extends Omit<SelectProps<KeyLabel | KeyLabel[]>, 'onChange'> {
  /** 自定义搜索方法, 返回搜索结果的 Promise */
  request?: (params: { query: string }) => Promise<DataValueType<T>[]>;
  /** 自定义选项渲染 */
  optionItemRender?: (item: DataValueType<T>) => React.ReactNode;
  /** 值改变后的回调 */
  onChange?: (value: DataValuesType<T>) => void;
  /** 指定组件中的值 */
  value?: KeyLabel | KeyLabel[];
  /** 指定默认选中的条目 */
  defaultValue?: KeyLabel | KeyLabel[];

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
  fetchData: (keyWord: string) => void;

  /** 清空数据 */
  resetData: () => void;
}

const SearchSelect = <T,>(props: SearchSelectProps<T>, ref: any) => {
  const {
    optionItemRender,
    mode,
    onSearch,
    onFocus,
    onChange,
    searchOnFocus = false,
    resetAfterSelect = false,
    className,
    disabled,
    options,
    fetchData,
    resetData,
    dropdownMatchSelectWidth = false,
    prefixCls: customizePrefixCls,
    ...restProps
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const prefixCls = getPrefixCls('pro-filed-search-select', customizePrefixCls);

  // 兼容 renderXXX API。

  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-disabled`]: disabled,
  });

  const getMergeValue: SelectProps<any>['onChange'] = (value, option) => {
    // 聚合数据传递给上游消费
    if (mode === 'multiple' && Array.isArray(value) && value.length > 0) {
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

    // 单选情况且用户选择了选项
    const dataItem = (option && option['data-item']) || {};
    return { ...dataItem, ...value };
  };

  return (
    <Select<any>
      ref={ref}
      className={classString}
      autoClearSearchValue
      filterOption={false}
      allowClear
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      disabled={disabled}
      mode={mode}
      {...restProps}
      optionLabelProp="label"
      onSearch={
        restProps?.showSearch
          ? (value) => {
              fetchData(value);
              onSearch?.(value);
            }
          : undefined
      }
      onChange={(value, optionList) => {
        if (!props.labelInValue) {
          onChange?.(value);
          return;
        }
        // 合并值
        const mergeValue = getMergeValue(value, optionList) as any;

        onChange?.(mergeValue);
        // 将搜索结果置空，重新搜索
        if (resetAfterSelect) resetData();
      }}
      onFocus={(e) => {
        if (searchOnFocus) {
          fetchData('');
        }
        onFocus?.(e);
      }}
    >
      {(options || []).map((item) => {
        const { label, value } = item;
        return (
          <Option
            value={value}
            key={value}
            data-item={item}
            className={`${prefixCls}-option`}
            label={item.label}
          >
            {optionItemRender?.(item as any) || label}
          </Option>
        );
      })}
    </Select>
  );
};

export default React.forwardRef(SearchSelect);
