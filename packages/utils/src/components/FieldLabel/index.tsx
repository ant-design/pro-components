import { CloseCircleFilled, DownOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import { ConfigProvider } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import classNames from 'classnames';
import React, { useContext, useImperativeHandle, useRef } from 'react';
import { useStyle } from './style';

export type FieldLabelProps = {
  label?: React.ReactNode;
  value?: any;
  disabled?: boolean;
  onClear?: () => void;
  size?: SizeType;
  ellipsis?: boolean;
  placeholder?: React.ReactNode;
  className?: string;
  formatter?: (value: any) => React.ReactNode;
  style?: React.CSSProperties;
  bordered?: boolean;
  allowClear?: boolean;
  downIcon?: React.ReactNode | false;
  onClick?: () => void;
  valueMaxLength?: number;
  /**
   * 点击标签的事件，用来唤醒 down menu 状态
   */
  onLabelClick?: () => void;
};

const FieldLabelFunction: React.ForwardRefRenderFunction<
  any,
  FieldLabelProps
> = (props, ref) => {
  const {
    label,
    onClear,
    value,
    disabled,
    onLabelClick,
    ellipsis,
    placeholder,
    className,
    formatter,
    bordered,
    style,
    downIcon,
    allowClear = true,
    valueMaxLength = 41,
  } = props;
  const { componentSize } = ConfigProvider?.useConfig?.() || {
    componentSize: 'middle',
  };
  const size = componentSize;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-core-field-label');
  const { wrapSSR, hashId } = useStyle(prefixCls);
  const intl = useIntl();
  const clearRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLElement>(null);

  useImperativeHandle(ref, () => ({
    labelRef,
    clearRef,
  }));

  const wrapElements = (
    array: (string | JSX.Element)[],
  ): JSX.Element[] | string => {
    if (array.every((item) => typeof item === 'string')) return array.join(',');

    return array.map((item, index) => {
      const comma = index === array.length - 1 ? '' : ',';
      if (typeof item === 'string') {
        return (
          <span key={index}>
            {item}
            {comma}
          </span>
        );
      }
      return (
        <span key={index} style={{ display: 'flex' }}>
          {item}
          {comma}
        </span>
      );
    });
  };

  const formatterText = (aValue: any) => {
    if (formatter) {
      return formatter(aValue);
    }
    return Array.isArray(aValue) ? wrapElements(aValue) : aValue;
  };

  const getTextByValue = (
    aLabel?: React.ReactNode | React.ReactNode[],
    aValue?: string | string[],
  ): React.ReactNode => {
    if (
      aValue !== undefined &&
      aValue !== null &&
      aValue !== '' &&
      (!Array.isArray(aValue) || aValue.length)
    ) {
      const prefix = aLabel ? (
        <span
          onClick={() => {
            onLabelClick?.();
          }}
          className={`${prefixCls}-text`}
        >
          {aLabel}
          {': '}
        </span>
      ) : (
        ''
      );
      const str = formatterText(aValue);
      if (!ellipsis) {
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {prefix}
            {formatterText(aValue)}
          </span>
        );
      }
      const getText = () => {
        const isArrayValue = Array.isArray(aValue) && aValue.length > 1;
        const unitText = intl.getMessage('form.lightFilter.itemUnit', '项');
        if (
          typeof str === 'string' &&
          str.length > valueMaxLength &&
          isArrayValue
        ) {
          return `...${aValue.length}${unitText}`;
        }
        return '';
      };
      const tail = getText();

      return (
        <span
          title={typeof str === 'string' ? str : undefined}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {prefix}
          <span style={{ paddingInlineStart: 4, display: 'flex' }}>
            {typeof str === 'string'
              ? str?.toString()?.slice?.(0, valueMaxLength)
              : str}
          </span>
          {tail}
        </span>
      );
    }
    return aLabel || placeholder;
  };
  return wrapSSR(
    <span
      className={classNames(
        prefixCls,
        hashId,
        `${prefixCls}-${props.size ?? size ?? 'middle'}`,
        {
          [`${prefixCls}-active`]:
            (Array.isArray(value) ? value.length > 0 : !!value) || value === 0,
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-bordered`]: bordered,
          [`${prefixCls}-allow-clear`]: allowClear,
        },
        className,
      )}
      style={style}
      ref={labelRef}
      onClick={() => {
        props?.onClick?.();
      }}
    >
      {getTextByValue(label, value)}
      {(value || value === 0) && allowClear && (
        <CloseCircleFilled
          role="button"
          title={intl.getMessage('form.lightFilter.clear', '清除')}
          className={classNames(
            `${prefixCls}-icon`,
            hashId,
            `${prefixCls}-close`,
          )}
          onClick={(e) => {
            if (!disabled) onClear?.();
            e.stopPropagation();
          }}
          ref={clearRef}
        />
      )}
      {downIcon !== false
        ? downIcon ?? (
            <DownOutlined
              className={classNames(
                `${prefixCls}-icon`,
                hashId,
                `${prefixCls}-arrow`,
              )}
            />
          )
        : null}
    </span>,
  );
};

export const FieldLabel = React.forwardRef(FieldLabelFunction);
