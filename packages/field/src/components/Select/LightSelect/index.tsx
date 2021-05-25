import React, { useState, useContext, useMemo } from 'react';
import type { SelectProps } from 'antd';
import { Select, Input, ConfigProvider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { FieldLabel } from '@ant-design/pro-utils';

import './index.less';

export type LightSelectProps = {
  label?: string;
  placeholder?: any;
};

/**
 * 如果有 label 就优先使用 label
 *
 * @param valueMap
 * @param v
 */
const getValueOrLabel = (
  valueMap: Record<string, string>,
  v:
    | {
        label: string;
        value: string;
      }
    | string,
) => {
  if (typeof v !== 'object') {
    return valueMap[v] || v;
  }
  return valueMap[v?.value] || v.label;
};

const LightSelect: React.ForwardRefRenderFunction<any, SelectProps<any> & LightSelectProps> = (
  props,
  ref,
) => {
  const {
    label,
    prefixCls: customizePrefixCls,
    onChange,
    value,
    mode,
    children,
    defaultValue,
    size,
    showSearch,
    disabled,
    style,
    className,
    bordered,
    options,
    onSearch,
    allowClear,
    labelInValue,
    ...restProps
  } = props;
  const { placeholder = label } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-select-light-select');
  const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');

  const valueMap: Record<string, string> = useMemo(() => {
    const values = {};
    options?.forEach(({ label: aLabel, value: aValue }) => {
      values[aValue] = aLabel || aValue;
    });
    return values;
  }, [options]);

  const filterValue = Array.isArray(value)
    ? value.map((v) => getValueOrLabel(valueMap, v))
    : getValueOrLabel(valueMap, value);

  return (
    <div
      className={classNames(
        prefixCls,
        {
          [`${prefixCls}-searchable`]: showSearch,
        },
        className,
      )}
      style={style}
      onClick={() => {
        if (!disabled) {
          setOpen(true);
        }
      }}
    >
      <Select
        {...restProps}
        allowClear={allowClear}
        value={value}
        mode={mode}
        labelInValue={labelInValue}
        size={size}
        disabled={disabled}
        onChange={(v, option) => {
          onChange?.(v, option);
          if (mode !== 'multiple') {
            setTimeout(() => {
              setOpen(false);
            }, 0);
          }
        }}
        bordered={bordered}
        showSearch={showSearch}
        onSearch={onSearch}
        style={style}
        dropdownRender={(menuNode) => {
          return (
            <div ref={ref}>
              {showSearch && (
                <div style={{ margin: '4px 8px' }}>
                  <Input
                    value={keyword}
                    allowClear={allowClear}
                    onChange={(e) => {
                      setKeyword(e.target.value.toLowerCase());
                      onSearch?.(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      // 避免按下删除键把选项也删除了
                      e.stopPropagation();
                    }}
                    style={{ width: '100%' }}
                    prefix={<SearchOutlined />}
                  />
                </div>
              )}
              {menuNode}
            </div>
          );
        }}
        open={open}
        onDropdownVisibleChange={setOpen}
        prefixCls={customizePrefixCls}
        options={
          keyword
            ? options?.filter((o) => {
                return (
                  String(o.label).toLowerCase().includes(keyword) ||
                  o.value.toLowerCase().includes(keyword)
                );
              })
            : options
        }
      />
      <FieldLabel
        ellipsis
        size={size}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        expanded={open}
        bordered={bordered}
        allowClear={allowClear}
        value={filterValue || value?.label || value}
        onClear={() => {
          onChange?.(undefined, undefined as any);
        }}
      />
    </div>
  );
};

export default React.forwardRef(LightSelect);
