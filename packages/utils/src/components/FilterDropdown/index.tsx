import React, { useContext } from 'react';
import { Dropdown, ConfigProvider } from 'antd';
import type { DropdownFooterProps } from '../DropdownFooter';
import Footer from '../DropdownFooter';
import './index.less';

export type FooterRender =
  | ((
      onConfirm?: (e?: React.MouseEvent) => void,
      onClear?: (e?: React.MouseEvent) => void,
    ) => JSX.Element)
  | false;

export type DropdownProps = {
  label?: React.ReactNode;
  footer?: DropdownFooterProps;
  footerRender?: FooterRender;
  padding?: number;
  disabled?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  visible?: boolean;
};

const FilterDropdown: React.FC<DropdownProps> = (props) => {
  const { children, label, footer, disabled, onVisibleChange, visible, footerRender } = props;
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
          {footer && <Footer disabled={disabled} footerRender={footerRender} {...footer} />}
        </div>
      }
    >
      <span className={`${prefixCls}-label`}>{label}</span>
    </Dropdown>
  );
};

export default FilterDropdown;
