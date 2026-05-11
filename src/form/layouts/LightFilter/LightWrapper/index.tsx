import { ConfigProvider } from 'antd';
import type { SizeType as AntdSizeType } from 'antd/lib/config-provider/SizeContext';
import type { TooltipPlacement } from 'antd/lib/tooltip';
import { clsx } from 'clsx';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  dateArrayFormatter,
  FieldLabel,
  FilterDropdown,
  getLightFilterRangeDisplayFormat,
  useRefFunction,
} from '../../../../utils';
import type { LightFilterFooterRender } from '../../../typing';
import { useStyle } from './style';

export type SizeType = AntdSizeType;

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
  valuePropName?: string;
  customLightMode?: boolean;
  light?: boolean;
  /**
   * @name 自定义label的值
   *
   * @example <caption>自定义数组的转化</caption>
   * labelFormatter={(value) =>value.join('-')} }
   */
  labelFormatter?: (value: any) => React.ReactNode;
  variant?: 'outlined' | 'filled' | 'borderless';
  otherFieldProps?: any;
  valueType?: string;
  allowClear?: boolean;
  footerRender?: LightFilterFooterRender;
  placement?: TooltipPlacement;
};

const LightWrapper: React.ForwardRefRenderFunction<any, LightWrapperProps> = (
  props,
) => {
  const {
    label,
    size,
    disabled,
    onChange: propsOnChange,
    className,
    style,
    children,
    valuePropName,
    placeholder,
    labelFormatter,
    variant,
    footerRender,
    allowClear,
    otherFieldProps,
    valueType,
    placement,
    ...rest
  } = props;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-light-wrapper');
  const { wrapSSR, hashId } = useStyle(prefixCls);
  const labelValue = (props as any)[valuePropName!];
  const [tempValue, setTempValue] = useState<string | undefined | null>(
    labelValue,
  );
  const [open, setOpen] = useState(false);

  // Form 的 initialValues 是异步注入的，初次渲染时 value 可能还是 undefined，
  // 当 Popover 关闭时同步外部最新值，避免影响编辑中的临时状态
  useEffect(() => {
    if (!open) {
      setTempValue(labelValue);
    }
  }, [labelValue, open]);

  const onChange = useRefFunction((...restParams: any[]) => {
    otherFieldProps?.onChange?.(...restParams);
    propsOnChange?.(...restParams);
  });

  /** DateRange的转化，dayjs 的 toString 有点不好用 */
  const labelValueText = useMemo(() => {
    if (!labelValue) return labelValue;
    const lowerValueType = valueType?.toLowerCase?.();
    if (
      lowerValueType?.endsWith('range') &&
      lowerValueType !== 'digitrange' &&
      !labelFormatter
    ) {
      return dateArrayFormatter(
        labelValue,
        getLightFilterRangeDisplayFormat(valueType),
      );
    }
    if (Array.isArray(labelValue))
      return labelValue.map((item) => {
        if (typeof item === 'object' && item.label && item.value) {
          return item.label;
        }
        return item;
      });

    return labelValue;
  }, [labelValue, valueType, labelFormatter]);

  return wrapSSR(
    <FilterDropdown
      disabled={disabled}
      open={open}
      onOpenChange={setOpen}
      placement={placement}
      label={
        <FieldLabel
          ellipsis
          size={size}
          onClear={() => {
            onChange?.();
            setTempValue(null);
          }}
          variant={variant}
          style={style}
          className={className}
          label={label}
          placeholder={placeholder}
          value={labelValueText}
          disabled={disabled}
          formatter={labelFormatter}
          allowClear={allowClear}
        />
      }
      footer={{
        onClear: () => setTempValue(null),
        onConfirm: () => {
          onChange?.(tempValue);
          setOpen(false);
        },
      }}
      footerRender={footerRender}
    >
      <div
        className={clsx(`${prefixCls}-container`, hashId, className)}
        style={style}
      >
        {(() => {
          const childElement = children as React.JSX.Element;
          const childProps = childElement.props as Record<string, any>;
          const mergedFieldProps = {
            ...childProps?.fieldProps,
            variant: 'borderless' as const,
            onChange: (...args: any[]) => {
              const e = args[0];
              setTempValue(e?.target ? e.target.value : e);
              childProps?.fieldProps?.onChange?.(...args);
            },
          };
          return React.cloneElement(childElement, {
            ...rest,
            ...childProps,
            [valuePropName!]: tempValue,
            onChange: (e: any) => {
              setTempValue(e?.target ? e.target.value : e);
              childProps?.onChange?.(e);
            },
            variant: 'borderless' as const,
            fieldProps: mergedFieldProps,
          });
        })()}
      </div>
    </FilterDropdown>,
  );
};

export { LightWrapper };
