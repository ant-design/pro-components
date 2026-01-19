import type { PopoverProps } from 'antd';
import { ConfigProvider, Popover } from 'antd';
import type { TooltipPlacement } from 'antd/lib/tooltip';
import { clsx } from 'clsx';
import React, { useContext, useMemo, useRef } from 'react';
import type { DropdownFooterProps } from '../DropdownFooter';
import { DropdownFooter } from '../DropdownFooter';
import { useStyle } from './style';

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

  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placement?: TooltipPlacement;
  /**
   * @name 透传给 Popover 的属性
   *
   * @description
   * 用于给弹层（portal 到 body 的容器）设置自定义类名/样式等，例如通过 classNames.root 控制样式范围。
   *
   * @example
   * popoverProps={{ classNames: { root: 'my-lightfilter-popover' } } }
   */
  popoverProps?: Omit<
    PopoverProps,
    'children' | 'content' | 'trigger' | 'open' | 'onOpenChange' | 'placement'
  >;
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
    popoverProps,
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-core-field-dropdown');
  const { wrapSSR, hashId } = useStyle(prefixCls);

  const htmlRef = useRef<HTMLDivElement>(null);
  const styles = useMemo(
    () => ({
      container: {
        padding: 0,
        ...((popoverProps?.styles as any)?.container || {}),
      },
      ...(popoverProps?.styles || {}),
    }),
    [popoverProps?.styles],
  );

  return wrapSSR(
    <Popover
      {...popoverProps}
      placement={placement}
      trigger={['click']}
      open={open || false}
      onOpenChange={onOpenChange}
      styles={styles}
      content={
        <div
          ref={htmlRef}
          className={clsx(`${prefixCls}-overlay`, {
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
