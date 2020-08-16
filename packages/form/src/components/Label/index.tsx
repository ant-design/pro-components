import React from 'react';
import { DownOutlined, CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import './index.less';

export interface LabelProps {
  prefixCls?: string;
  label: string;
  value?: string | string[];
  disabled?: boolean;
  onClear?: () => void;
  size?: SizeType;
  ellipsis?: boolean;
  placeholder?: string;
  expanded?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const LightFilterLabel: React.FC<LabelProps> = (props) => {
  const {
    label,
    prefixCls: customizePrefixCls = 'ant-pro-form',
    onClear,
    value,
    size = 'default',
    disabled,
    ellipsis,
    placeholder,
    className,
    style,
  } = props;
  const prefixCls = `${customizePrefixCls}-light-filter-label`;
  // TODO 国际化
  const locale = {
    itemUnit: '项',
  };

  const getTextByValue = (aLabel: string, aValue?: string | string[]): React.ReactNode => {
    if (aValue && (!Array.isArray(aValue) || aValue.length)) {
      const str = Array.isArray(aValue) ? aValue.join(',') : aValue;
      const prefix = aLabel ? `${aLabel}: ` : '';
      if (!ellipsis) {
        return <span>{`${prefix}${str}`}</span>;
      }
      const tail =
        str.length > 16
          ? `...${
              Array.isArray(aValue) && aValue.length > 1 ? `${aValue.length}${locale.itemUnit}` : ''
            }`
          : '';
      return <span title={str}>{`${prefix}${str.substr(0, 16)}${tail}`}</span>;
    }
    return placeholder || aLabel;
  };

  return (
    <span
      className={classNames(
        prefixCls,
        `${prefixCls}-${size}`,
        {
          [`${prefixCls}-active`]: !!value,
          [`${prefixCls}-disabled`]: disabled,
        },
        className,
      )}
      style={style}
    >
      {getTextByValue(label, value)}
      {value && (
        <CloseOutlined
          className={classNames(`${prefixCls}-icon`, `${prefixCls}-close`)}
          onClick={(e) => {
            if (onClear && !disabled) {
              onClear();
            }
            e.stopPropagation();
          }}
        />
      )}
      <DownOutlined className={classNames(`${prefixCls}-icon`, `${prefixCls}-arrow`)} />
    </span>
  );
};

export default LightFilterLabel;
