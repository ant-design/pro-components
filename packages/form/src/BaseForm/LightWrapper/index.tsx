import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { FieldDropdown, FieldLabel } from '@ant-design/pro-utils';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { ConfigContext } from 'antd/lib/config-provider';

import './index.less';

export interface LightWrapperProps {
  label?: React.ReactNode;
  disabled?: boolean;
  placeholder?: React.ReactNode;
  size?: SizeType;
  onChange?: (value?: any) => void;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  valuePropName?: string;
  customLightMode?: boolean;
  light?: boolean;
}

const LightWrapper: React.ForwardRefRenderFunction<any, LightWrapperProps> = (props, ref) => {
  const {
    label,
    size,
    disabled,
    onChange,
    className,
    style,
    children,
    valuePropName = 'value',
    light,
    customLightMode,
    placeholder,
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pro-field-light-wrapper');
  const [tempValue, setTempValue] = useState<string | undefined>(props[valuePropName]);
  const [open, setOpen] = useState<boolean>(false);

  if (!light || customLightMode) {
    return (
      <React.Fragment>
        {React.isValidElement(children)
          ? React.cloneElement(children, {
              ref,
              ...children.props,
              fieldProps: {
                [valuePropName]: props[valuePropName],
                // 这个 onChange 是 Form.Item 添加上的，要通过 fieldProps 透传给 ProField 调用
                onChange,
                // 优先使用 children.props.fieldProps，比如 LightFilter 中可能需要通过 fieldProps 覆盖 Form.Item 默认的 onChange
                ...children.props.fieldProps,
              },
            })
          : children}
      </React.Fragment>
    );
  }

  return (
    <FieldDropdown
      disabled={disabled}
      onVisibleChange={setOpen}
      visible={open}
      label={
        <FieldLabel
          ellipsis
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
          value={props[valuePropName]}
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
      <div className={classNames(`${prefixCls}-container`, className)} style={style}>
        {React.isValidElement(children)
          ? React.cloneElement(children, {
              ref,
              ...children.props,
              fieldProps: {
                className: `${prefixCls}-field`,
                [valuePropName]: tempValue,
                onChange: (e: any) => {
                  setTempValue(e?.target ? e.target.value : e);
                },
                ...children.props.fieldProps,
              },
            })
          : children}
      </div>
    </FieldDropdown>
  );
};

export default React.forwardRef(LightWrapper);
