import React, { useState, useContext, useMemo } from 'react';
import { Select, Input } from 'antd';
import { SelectProps } from 'antd/es/select';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { FieldLabel } from '@ant-design/pro-utils';
import { ConfigContext } from 'antd/lib/config-provider';

import './index.less';

export interface LightSelectProps {
  label?: string;
  placeholder?: string;
}

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
    options = [],
    onSearch,
    ...restProps
  } = props;
  const { placeholder = label } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pro-field-select-light-select');
  const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');

  const valueMap: {
    [key: string]: string;
  } = useMemo(() => {
    const values = {};
    options.forEach(({ label: aLabel, value: aValue }) => {
      values[aValue] = aLabel || aValue;
    });
    return values;
  }, [children, options]);

  return (
    <div
      className={classNames(
        prefixCls,
        {
          [`${prefixCls}-searchble`]: showSearch,
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
        value={value}
        mode={mode}
        disabled={disabled}
        onChange={(v, option) => {
          if (onChange) {
            onChange(v, option);
          }
          if (mode !== 'multiple') {
            setTimeout(() => {
              setOpen(false);
            }, 0);
          }
        }}
        dropdownRender={(menuNode) => {
          return (
            <div ref={ref}>
              {showSearch && (
                <div style={{ margin: '4px 8px' }}>
                  <Input
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value.toLowerCase());
                      if (onSearch) {
                        onSearch(e.target.value);
                      }
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
            ? options.filter((o) => {
                return (
                  String(o.label).toLowerCase().indexOf(keyword) !== -1 ||
                  o.value.toLowerCase().indexOf(keyword) !== -1
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
        value={Array.isArray(value) ? value.map((v) => valueMap[v] || v) : valueMap[value] || value}
        onClear={() => {
          // @ts-expect-error
          onChange(undefined, undefined);
        }}
      />
    </div>
  );
};

export default React.forwardRef(LightSelect);
