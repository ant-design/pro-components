import { SearchOutlined } from '@ant-design/icons';
import { toArray } from '@rc-component/util';
import type { SelectProps } from 'antd';
import { ConfigProvider, Input, Select } from 'antd';
import classNames from 'classnames';
import React, { useContext, useMemo, useState } from 'react';
import { FieldLabel, useStyle } from '../../../../utils';
import type { ProFieldLightProps } from '../../../PureProField';

export type LightSelectProps = {
  label?: string;
  placeholder?: any;
  valueMaxLength?: number;
  /** 刷新数据 */
  fetchData: (keyWord?: string) => void;
  /**
   * 当搜索关键词发生变化时是否请求远程数据
   *
   * @default true
   */
  fetchDataOnSearch?: boolean;
  /** 变体类型 */
  variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
} & ProFieldLightProps &
  SelectProps;

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

export const LightSelect: React.FC<
  SelectProps<any> &
    LightSelectProps & {
      ref?: React.Ref<any>;
    }
> = ({ ref, ...props }) => {
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
    fetchDataOnSearch = false,
    fetchData,
    variant = 'outlined',
    ...restProps
  } = props;
  const { placeholder = label } = props;
  const { label: labelPropsName = 'label', value: valuePropsName = 'value' } = fieldNames || {};
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

  // 修复用户在使用ProFormSelect组件时，在fieldProps中使用open属性，不生效。
  // ProComponents文档中写到"与select相同，且fieldProps同antd组件中的props"描述方案不相符
  const mergeOpen = useMemo(() => {
    if (Reflect.has(restProps, 'open')) {
      return restProps?.open;
    }
    return open;
  }, [open, restProps]);

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
        // Only handle clicks outside the label
        const isLabelClick = lightLabel?.current?.labelRef?.current?.contains(e.target as HTMLElement);
        if (!isLabelClick) {
          setOpen(true);
        }
      }}
    >
      <Select
        {...restProps}
        allowClear={allowClear}
        disabled={disabled}
        labelInValue={labelInValue}
        mode={mode}
        open={mergeOpen}
        options={
          onSearch || !keyword
            ? options
            : options?.filter((o) => {
                if (optionFilterProp) {
                  return toArray(o[optionFilterProp]).join('').toLowerCase().includes(keyword);
                }
                return (
                  String(o[labelPropsName])?.toLowerCase()?.includes(keyword?.toLowerCase()) ||
                  o[valuePropsName]?.toString()?.toLowerCase()?.includes(keyword?.toLowerCase())
                );
              })
        }
        popupRender={(menuNode) => {
          return (
            <div ref={ref}>
              {showSearch && (
                <div style={{ margin: '4px 8px' }}>
                  <Input
                    allowClear={!!allowClear}
                    prefix={<SearchOutlined />}
                    style={{ width: '100%' }}
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      if (fetchDataOnSearch && fetchData) {
                        fetchData(e.target.value);
                      }
                      onSearch?.(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      // 避免按下删除键把选项也删除了
                      if (e.key === 'Backspace') {
                        e.stopPropagation();
                        return;
                      }
                      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
              )}
              {menuNode}
            </div>
          );
        }}
        prefixCls={customizePrefixCls}
        showSearch={showSearch}
        size={size}
        style={style}
        value={value}
        variant={variant}
        onChange={(v, option) => {
          onChange?.(v, option);
          if (mode !== 'multiple') {
            setOpen(false);
          }
        }}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            //  测试环境下直接跑
            setKeyword('');
          }
          if (!labelTrigger) {
            setOpen(isOpen);
          }
          restProps?.onOpenChange?.(isOpen);
        }}
        onSearch={
          showSearch
            ? (keyValue) => {
                if (fetchDataOnSearch && fetchData) {
                  fetchData(keyValue);
                }
                onSearch?.(keyValue);
              }
            : void 0
        }
      />
      <FieldLabel
        ref={lightLabel}
        ellipsis
        allowClear={!!allowClear}
        disabled={disabled}
        label={label}
        placeholder={placeholder}
        value={filterValue || value?.label || value}
        valueMaxLength={valueMaxLength}
        variant={variant}
        onClear={() => {
          onChange?.(undefined, undefined);
        }}
        onClick={() => {
          if (disabled) return;
          setOpen(!open);
        }}
      />
    </div>,
  );
};

export default LightSelect;
