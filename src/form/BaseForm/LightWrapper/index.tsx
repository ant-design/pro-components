import { ConfigProvider } from 'antd';
import type { TooltipPlacement } from 'antd/lib/tooltip';
import { clsx } from 'clsx';
import React, { useContext, useMemo, useState } from 'react';
import {
  dateArrayFormatter,
  dateFormatterMap,
  FieldLabel,
  FilterDropdown,
} from '../../../utils';
import type { LightFilterFooterRender } from '../../typing';
import { useStyle } from './style';

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
  const [tempValue, setTempValue] = useState<string | undefined | null>(
    (props as any)[valuePropName!],
  );
  const [open, setOpen] = useState(false);

  const onChange = (...restParams: any[]) => {
    otherFieldProps?.onChange?.(...restParams);
    propsOnChange?.(...restParams);
  };

  const labelValue = (props as any)[valuePropName!];

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
        (valueType && (dateFormatterMap as any)[valueType]) || 'YYYY-MM-DD',
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
      variant={variant}
      label={
        <FieldLabel
          ellipsis
          size={size}
          onClear={() => {
            onChange?.();
            setTempValue(null);
          }}
          variant={variant === 'outlined' ? 'borderless' : variant}
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
        {React.cloneElement(children as JSX.Element, {
          ...rest,
          [valuePropName!]: tempValue,
          onChange: (e: any) => {
            setTempValue(e?.target ? e.target.value : e);
          },
          ...(children as JSX.Element).props,
          // light 模式下由外层 FilterDropdown 统一描边，内层 Select/TreeSelect/DatePicker 等统一使用 borderless，各 Field 组件无需再根据 light 判断
          variant: 'borderless' as const,
          fieldProps: {
            ...(children as JSX.Element).props?.fieldProps,
            variant: 'borderless' as const,
          },
        })}
      </div>
    </FilterDropdown>,
  );
};

export { LightWrapper };
