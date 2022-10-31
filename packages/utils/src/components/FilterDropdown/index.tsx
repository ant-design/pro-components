import { ConfigProvider, Dropdown } from 'antd';
import React, { useContext } from 'react';
import type { DropdownFooterProps } from '../DropdownFooter';
import { DropdownFooter } from '../DropdownFooter';

import { useStyle } from './style';

import 'antd/es/dropdown/style';
import { openVisibleCompatible } from '../../compareVersions/openVisibleCompatible';

declare const Placements: [
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
];
declare type Placement = typeof Placements[number];

export type FooterRender =
  | ((
      onConfirm?: (e?: React.MouseEvent) => void,
      onClear?: (e?: React.MouseEvent) => void,
    ) => JSX.Element | false)
  | false;

export type DropdownProps = {
  label?: React.ReactNode;
  footer?: DropdownFooterProps;
  footerRender?: FooterRender;
  padding?: number;
  disabled?: boolean;
  /**
   * @deprecated use onOpenChange replace
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * @deprecated use open replace
   */
  visible?: boolean;
  onOpenChange?: (visible: boolean) => void;
  open?: boolean;
  placement?: Placement;
  children?: React.ReactNode;
};
const FilterDropdown: React.FC<DropdownProps> = (props) => {
  const {
    children,
    label,
    footer,
    open,
    onOpenChange,
    disabled,
    onVisibleChange,
    visible,
    footerRender,
    placement,
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-core-field-dropdown');
  const { wrapSSR, hashId } = useStyle(prefixCls);

  const dropdownOpenProps = openVisibleCompatible(
    open || visible || false,
    onOpenChange || onVisibleChange,
  );

  return wrapSSR(
    <Dropdown
      disabled={disabled}
      placement={placement}
      trigger={['click']}
      {...dropdownOpenProps}
      overlay={
        <div className={`${prefixCls}-overlay ${prefixCls}-overlay-${placement} ${hashId}`}>
          <div className={`${prefixCls}-content ${hashId}`}>{children}</div>
          {footer && <DropdownFooter disabled={disabled} footerRender={footerRender} {...footer} />}
        </div>
      }
    >
      <span className={`${prefixCls}-label ${hashId}`}>{label}</span>
    </Dropdown>,
  );
};

export { FilterDropdown };
