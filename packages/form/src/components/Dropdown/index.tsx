import React, { useContext } from 'react';
import { Dropdown } from 'antd';
import { ConfigContext } from 'antd/lib/config-provider';
import Footer, { FooterProps } from './Footer';
import './index.less';

export interface DropdownProps {
  /**
   * 自定义前缀
   */
  prefixCls?: string;
  label?: React.ReactNode;
  footer?: FooterProps;
  hideWhenClick?: boolean;
  padding?: number;
  disabled?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  visible?: boolean;
}

const FilterDropdown: React.FC<DropdownProps> = (props) => {
  const {
    children,
    label = 'hover me',
    footer,
    hideWhenClick,
    disabled,
    onVisibleChange,
    visible,
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pro-form-dropdown');
  return (
    <Dropdown
      disabled={disabled}
      trigger={['click']}
      visible={visible}
      onVisibleChange={onVisibleChange}
      overlay={
        <div className={`${prefixCls}-overlay`}>
          <div
            className={`${prefixCls}-content`}
            onClick={(e) => {
              if (!hideWhenClick) {
                e.stopPropagation();
              }
            }}
          >
            {children}
          </div>
          {footer && <Footer disabled={disabled} prefixCls={prefixCls} {...footer} />}
        </div>
      }
    >
      <span className={`${prefixCls}-label`}>{label}</span>
    </Dropdown>
  );
};

export default FilterDropdown;
