import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import {
  FilterDropdown,
  FieldLabel,
  isDropdownValueType,
  useMountMergeState,
  omitUndefined,
} from '@ant-design/pro-utils';
import { ConfigProvider } from 'antd';

import './index.less';

export type SizeType = 'small' | 'middle' | 'large' | undefined;

export type LightWrapperProps = {
  label?: React.ReactNode;
  disabled?: boolean;
  placeholder?: React.ReactNode;
  size?: SizeType;
  value?: any;
  onChange?: (value?: any) => void;
  onBlur?: (value?: any) => void;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  valuePropName: string;
  customLightMode?: boolean;
  light?: boolean;
  id?: string;
  labelFormatter?: (value: any) => string;
  bordered?: boolean;
};

const LightWrapper: React.ForwardRefRenderFunction<any, LightWrapperProps> = (props) => {
  const {
    label,
    size,
    disabled,
    onChange,
    onBlur,
    className,
    style,
    children,
    valuePropName,
    light,
    customLightMode,
    placeholder,
    id,
    labelFormatter,
    bordered,
    value,
  } = props;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-light-wrapper');
  const [tempValue, setTempValue] = useState<string | undefined>(props[valuePropName]);
  const [open, setOpen] = useMountMergeState<boolean>(false);

  const isDropdown =
    React.isValidElement(children) && isDropdownValueType(children.props.valueType);

  if (!light || customLightMode || isDropdown) {
    if (React.isValidElement(children)) {
      return React.cloneElement(
        children,
        omitUndefined({
          value,
          onChange,
          onBlur,
          ...children.props,
          fieldProps: omitUndefined({
            id,
            [valuePropName]: props[valuePropName],
            // 优先使用 children.props.fieldProps，比如 LightFilter 中可能需要通过 fieldProps 覆盖 Form.Item 默认的 onChange
            ...children.props.fieldProps,
            // 这个 onChange 是 Form.Item 添加上的，要通过 fieldProps 透传给 ProField 调用
            onChange,
            onBlur,
          }),
        }),
      );
    }

    return children as JSX.Element;
  }

  let allowClear;
  if (children && React.isValidElement(children)) {
    allowClear = children.props.fieldProps?.allowClear;
  }
  const labelValue = props[valuePropName];
  return (
    <FilterDropdown
      disabled={disabled}
      onVisibleChange={setOpen}
      visible={open}
      label={
        <FieldLabel
          ellipsis
          size={size}
          onClear={() => {
            onChange?.();
            setTempValue(undefined);
          }}
          bordered={bordered}
          style={style}
          className={className}
          label={label}
          placeholder={placeholder}
          value={labelValue}
          disabled={disabled}
          expanded={open}
          formatter={labelFormatter}
          allowClear={allowClear}
        />
      }
      footer={{
        onClear: () => setTempValue(undefined),
        onConfirm: () => {
          onChange?.(tempValue);
          setOpen(false);
        },
      }}
    >
      <div className={classNames(`${prefixCls}-container`, className)} style={style}>
        {React.isValidElement(children)
          ? React.cloneElement(children, {
              ...children.props,
              fieldProps: {
                className: `${prefixCls}-field`,
                [valuePropName]: tempValue,
                id,
                onChange: (e: any) => {
                  setTempValue(e?.target ? e.target.value : e);
                },
                allowClear,
                ...children.props.fieldProps,
              },
            })
          : children}
      </div>
    </FilterDropdown>
  );
};

export default LightWrapper;
