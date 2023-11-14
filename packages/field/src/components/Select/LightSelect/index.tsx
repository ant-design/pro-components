import { SearchOutlined } from '@ant-design/icons';
import { FieldLabel, useStyle } from '@ant-design/pro-utils';
import type { SelectProps } from 'antd';
import { ConfigProvider, Input, Select } from 'antd';

import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import React, { useContext, useMemo, useState } from 'react';
import type { ProFieldLightProps } from '../../../index';

export type LightSelectProps = {
  label?: string;
  placeholder?: any;
  valueMaxLength?: number;
} & ProFieldLightProps;

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

const LightSelect: React.ForwardRefRenderFunction<
  any,
  SelectProps<any> & LightSelectProps
> = (props, ref) => {
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
    fieldNames,
    lightLabel,
    labelTrigger,
    optionFilterProp,
    optionLabelProp = '',
    valueMaxLength = 41,
    ...restProps
  } = props;
  const { placeholder = label } = props;
  const { label: labelPropsName = 'label', value: valuePropsName = 'value' } =
    fieldNames || {};
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-select-light-select');
  const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');

  // css
  const { wrapSSR, hashId } = useStyle('LightSelect', (token) => {
    return {
      [`.${prefixCls}`]: {
        [`${token.antCls}-select`]: {
          position: 'absolute',
          width: '153px',
          height: '28px',
          visibility: 'hidden',
          '&-selector': {
            height: 28,
          },
        },

        [`&.${prefixCls}-searchable`]: {
          [`${token.antCls}-select`]: {
            width: '200px',
            '&-selector': {
              height: 28,
            },
          },
        },
      },
    };
  });

  const valueMap: Record<string, string> = useMemo(() => {
    const values = {} as Record<string, any>;
    options?.forEach((item) => {
      const optionLabel = item[optionLabelProp] || item[labelPropsName];
      const optionValue = item[valuePropsName];
      values[optionValue!] = optionLabel || optionValue;
    });
    return values;
  }, [labelPropsName, options, valuePropsName, optionLabelProp]);

  const filterValue = Array.isArray(value)
    ? value.map((v) => getValueOrLabel(valueMap, v))
    : getValueOrLabel(valueMap, value);

  return wrapSSR(
    <div
      className={classNames(
        prefixCls,
        hashId,
        {
          [`${prefixCls}-searchable`]: showSearch,
        },
        `${prefixCls}-container-${restProps.placement || 'bottomLeft'}`,
        className,
      )}
      style={style}
      onClick={(e) => {
        if (disabled) return;
        // 点击label切换下拉菜单
        const isLabelClick = lightLabel?.current?.labelRef?.current?.contains(
          e.target as HTMLElement,
        );
        if (isLabelClick) {
          setOpen(!open);
        } else {
          setOpen(true);
        }
      }}
    >
      <Select
        popupMatchSelectWidth={false}
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
            setOpen(false);
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
                    allowClear={!!allowClear}
                    onChange={(e) => {
                      setKeyword(e.target.value);
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
        onDropdownVisibleChange={(isOpen) => {
          if (!isOpen) {
            //  测试环境下直接跑
            setKeyword('');
          }
          if (!labelTrigger) {
            setOpen(isOpen);
          }
          restProps?.onDropdownVisibleChange?.(isOpen);
        }}
        prefixCls={customizePrefixCls}
        options={
          onSearch || !keyword
            ? options
            : options?.filter((o) => {
                if (optionFilterProp) {
                  return toArray(o[optionFilterProp])
                    .join('')
                    .toLowerCase()
                    .includes(keyword);
                }
                return (
                  String(o[labelPropsName])
                    ?.toLowerCase()
                    ?.includes(keyword?.toLowerCase()) ||
                  o[valuePropsName]
                    ?.toString()
                    ?.toLowerCase()
                    ?.includes(keyword?.toLowerCase())
                );
              })
        }
      />
      <FieldLabel
        ellipsis
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        bordered={bordered}
        allowClear={!!allowClear}
        value={filterValue || value?.label || value}
        onClear={() => {
          onChange?.(undefined, undefined as any);
        }}
        ref={lightLabel}
        valueMaxLength={valueMaxLength}
      />
    </div>,
  );
};

export default React.forwardRef(LightSelect);
