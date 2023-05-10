import {
  dateArrayFormatter,
  dateFormatterMap,
  FieldLabel,
  FilterDropdown,
  useMountMergeState,
} from '@ant-design/pro-utils';
import { ConfigProvider } from 'antd';
import classNames from 'classnames';
import React, { useContext, useMemo, useState } from 'react';
import type { LightFilterFooterRender } from '../../typing';
import { useStyle } from './style';
import type { TooltipPlacement } from 'antd/lib/tooltip';

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
  bordered?: boolean;
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
    bordered,
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
  const [tempValue, setTempValue] = useState<string | undefined>(
    props[valuePropName!],
  );
  const [open, setOpen] = useMountMergeState<boolean>(false);

  const onChange = (...restParams: any[]) => {
    otherFieldProps?.onChange?.(...restParams);
    propsOnChange?.(...restParams);
  };

  const labelValue = props[valuePropName!];

  /** DataRange的转化，dayjs 的 toString 有点不好用 */
  const labelText = useMemo(() => {
    if (
      valueType?.toLowerCase()?.endsWith('range') &&
      valueType !== 'digitRange' &&
      !labelFormatter
    ) {
      return dateArrayFormatter(
        labelValue,
        dateFormatterMap[valueType] || 'YYYY-MM-DD',
      );
    }
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
            setTempValue('');
          }}
          bordered={bordered}
          style={style}
          className={className}
          label={label}
          placeholder={placeholder}
          value={labelText}
          disabled={disabled}
          formatter={labelFormatter}
          allowClear={allowClear}
        />
      }
      footer={{
        onClear: () => setTempValue(''),
        onConfirm: () => {
          onChange?.(tempValue);
          setOpen(false);
        },
      }}
      footerRender={footerRender}
    >
      <div
        className={classNames(`${prefixCls}-container`, hashId, className)}
        style={style}
      >
        {React.cloneElement(children as JSX.Element, {
          ...rest,
          [valuePropName!]: tempValue,
          onChange: (e: any) => {
            setTempValue(e?.target ? e.target.value : e);
          },
          ...(children as JSX.Element).props,
        })}
      </div>
    </FilterDropdown>,
  );
};

export { LightWrapper };
