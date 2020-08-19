import React, { useContext } from 'react';
import { Dropdown } from 'antd';
import { ConfigContext } from 'antd/lib/config-provider';
import Footer, { DropdownFooterProps } from '../DropdownFooter';

import './index.less';

export interface DropdownProps {
  label?: React.ReactNode;
  footer?: DropdownFooterProps;
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
  const prefixCls = getPrefixCls('pro-core-field-dropdown');

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
          {footer && <Footer disabled={disabled} {...footer} />}
        </div>
      }
    >
      <span className={`${prefixCls}-label`}>{label}</span>
    </Dropdown>
  );
};

export default FilterDropdown;
