import { ConfigProvider, Popover } from 'antd';
import type { TooltipPlacement } from 'antd/es/tooltip';
import classNames from 'classnames';
import type { JSX } from 'react';
import React, { useContext, useRef } from 'react';
import type { DropdownFooterProps } from '../DropdownFooter';
import { DropdownFooter } from '../DropdownFooter';
import { useStyle } from './style';

export type FooterRender =
  | ((onConfirm?: (e?: React.MouseEvent) => void, onClear?: (e?: React.MouseEvent) => void) => JSX.Element | false)
  | false;

export type DropdownProps = {
  label?: React.ReactNode;
  footer?: DropdownFooterProps;
  footerRender?: FooterRender;
  padding?: number;
  disabled?: boolean;

  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placement?: TooltipPlacement;
  children?: React.ReactNode;
};
const FilterDropdown: React.FC<DropdownProps> = (props) => {
  const { children, label, footer, open, onOpenChange, disabled, footerRender, placement } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-core-field-dropdown');
  const { wrapSSR, hashId } = useStyle(prefixCls);

  const htmlRef = useRef<HTMLDivElement>(null);
  return wrapSSR(
    <Popover
      content={
        <div
          ref={htmlRef}
          className={classNames(`${prefixCls}-overlay`, {
            [`${prefixCls}-overlay-${placement}`]: placement,
            hashId,
          })}
        >
          <ConfigProvider
            getPopupContainer={() => {
              return htmlRef.current || document.body;
            }}
          >
            <div className={`${prefixCls}-content ${hashId}`.trim()}>{children}</div>
          </ConfigProvider>
          {footer && <DropdownFooter disabled={disabled} footerRender={footerRender} {...footer} />}
        </div>
      }
      open={open || false}
      placement={placement}
      styles={{
        body: {
          padding: 0,
        },
      }}
      trigger={['click']}
      onOpenChange={onOpenChange}
    >
      <span className={`${prefixCls}-label ${hashId}`.trim()}>{label}</span>
    </Popover>,
  );
};

export { FilterDropdown };
