import { ConfigProvider, Popover } from 'antd';
import type { TooltipPlacement } from 'antd/lib/tooltip';
import classNames from 'classnames';
import React, { useContext, useRef } from 'react';
import type { DropdownFooterProps } from '../DropdownFooter';
import { DropdownFooter } from '../DropdownFooter';
import { useStyle } from './style';

export type FooterRender =
  | ((
      onConfirm?: (e?: React.MouseEvent) => void,
      onClear?: (e?: React.MouseEvent) => void,
    ) => React.ReactElement | false)
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
  const {
    children,
    label,
    footer,
    open,
    onOpenChange,
    disabled,
    footerRender,
    placement,
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-core-field-dropdown');
  const { wrapSSR, hashId } = useStyle(prefixCls);

  const htmlRef = useRef<HTMLDivElement>(null);
  return wrapSSR(
    <Popover
      placement={placement}
      trigger={['click']}
      open={open || false}
      onOpenChange={onOpenChange}
      styles={{
        container: {
          padding: 0,
        },
      }}
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
            <div className={`${prefixCls}-content ${hashId}`.trim()}>
              {children}
            </div>
          </ConfigProvider>
          {footer && (
            <DropdownFooter
              disabled={disabled}
              footerRender={footerRender}
              {...footer}
            />
          )}
        </div>
      }
    >
      <span className={`${prefixCls}-label ${hashId}`.trim()}>{label}</span>
    </Popover>,
  );
};

export { FilterDropdown };
