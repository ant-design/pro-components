import React, { useContext } from 'react';
import { Dropdown, ConfigProvider } from 'antd';
import type { DropdownFooterProps } from '../DropdownFooter';
import Footer from '../DropdownFooter';

import './index.less';

export type DropdownProps = {
  label?: React.ReactNode;
  footer?: DropdownFooterProps;
  padding?: number;
  disabled?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  visible?: boolean;
};

const FilterDropdown: React.FC<DropdownProps> = (props) => {
  const { children, label, footer, disabled, onVisibleChange, visible } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-core-field-dropdown');

  return (
    <Dropdown
      disabled={disabled}
      trigger={['click']}
      visible={visible}
      onVisibleChange={onVisibleChange}
      overlay={
        <div className={`${prefixCls}-overlay`}>
          <div className={`${prefixCls}-content`}>{children}</div>
          {footer && <Footer disabled={disabled} {...footer} />}
        </div>
      }
    >
      <span className={`${prefixCls}-label`}>{label}</span>
    </Dropdown>
  );
};

export default FilterDropdown;
