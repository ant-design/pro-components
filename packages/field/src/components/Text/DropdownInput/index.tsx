import React, { useState, useContext } from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/es/input';
import classNames from 'classnames';
import { FieldDropdown, FieldLabel } from '@ant-design/pro-utils';
import { ConfigContext } from 'antd/lib/config-provider';

import './index.less';

export interface InputFilterProps {
  /**
   * 自定义前缀
   */
  prefixCls?: string;
  value?: string;
  defaultValue?: string;
  label?: string;
  // 是否是次要的字段，是的话没有值的时候收起到更多选项里面
  secondary?: boolean;
  disabled?: boolean;
  // collapse 由 LightFilter 控制，用户不关心
  collapse?: boolean;
  field: string;
  placeholder?: string;
  onChange?: (value?: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

const DropdownInput: React.ForwardRefRenderFunction<any, InputProps & InputFilterProps> = (
  props,
  ref,
) => {
  // collapse 是外层 LightFilter 设置
  const {
    prefixCls: customizePrefixCls,
    label,
    field,
    collapse,
    size,
    disabled,
    defaultValue,
    onChange,
    value,
    className,
    style,
    ...restProps
  } = props;
  const { placeholder = label || field } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pro-field-text-dropdown-input');
  const [tempValue, setTempValue] = useState<string | undefined>(value);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <FieldDropdown
      disabled={disabled}
      onVisibleChange={setOpen}
      visible={open}
      label={
        <FieldLabel
          ellipsis
          // @ts-ignore
          size={size}
          onClear={() => {
            if (onChange) {
              onChange();
            }
            setTempValue(undefined);
          }}
          style={style}
          className={className}
          label={label}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          expanded={open}
        />
      }
      footer={{
        onClear: () => {
          setTempValue(undefined);
        },
        onConfirm: () => {
          if (onChange) {
            onChange(tempValue);
          }
          setOpen(false);
        },
      }}
    >
      <div className={classNames(`${prefixCls}-container`, classNames)} style={style}>
        <Input
          ref={ref}
          {...restProps}
          className={classNames(
            `${prefixCls}-input`,
            {
              [`${prefixCls}-collapse`]: collapse,
            },
            className,
          )}
          style={collapse ? style : undefined}
          disabled={disabled}
          value={collapse ? value : tempValue}
          onChange={(e) => {
            const val = e.target.value;
            if (collapse) {
              if (onChange) {
                onChange(val);
              }
            } else {
              setTempValue(val);
            }
          }}
        />
      </div>
    </FieldDropdown>
  );
};

export default React.forwardRef(DropdownInput);
