import { ConfigProvider, Dropdown } from 'antd';
import React, { useContext } from 'react';
import type { DropdownFooterProps } from '../DropdownFooter';
import { DropdownFooter } from '../DropdownFooter';
import { useStyle } from './style';

import 'antd/es/dropdown/style';

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
  onVisibleChange?: (visible: boolean) => void;
  visible?: boolean;
  placement?: Placement;
  children?: React.ReactNode;
};

const FilterDropdown: React.FC<DropdownProps> = (props) => {
  const { children, label, footer, disabled, onVisibleChange, visible, footerRender, placement } =
    props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-core-field-dropdown');
  const { wrapSSR, hashId } = useStyle(prefixCls);

  return wrapSSR(
    <Dropdown
      disabled={disabled}
      placement={placement}
      trigger={['click']}
      // @ts-expect-error
      visible={visible}
      open={visible}
      onVisibleChange={onVisibleChange}
      onOpenChange={onVisibleChange}
      overlay={
        <div className={`${prefixCls}-overlay ${hashId}`}>
          <div className={`${prefixCls}-content`}>{children}</div>
          {footer && <DropdownFooter disabled={disabled} footerRender={footerRender} {...footer} />}
        </div>
      }
    >
      <span className={`${prefixCls}-label`}>{label}</span>
    </Dropdown>,
  );
};

export { FilterDropdown };
