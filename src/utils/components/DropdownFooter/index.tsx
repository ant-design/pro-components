import { Button, ConfigProvider } from 'antd';
import classNames from 'classnames';
import type { JSX } from 'react';
import React, { useContext } from 'react';
import { useIntl } from '../../../provider';
import { useStyle } from './style';

type LightFilterFooterRender =
  | ((onConfirm?: (e?: React.MouseEvent) => void, onClear?: (e?: React.MouseEvent) => void) => JSX.Element | false)
  | false;

type OnClick = (e?: React.MouseEvent) => void;

export type DropdownFooterProps = {
  onClear?: OnClick;
  onConfirm?: OnClick;
  disabled?: boolean;
  footerRender?: LightFilterFooterRender;
  children?: React.ReactNode;
};

const DropdownFooter: React.FC<DropdownFooterProps> = (props) => {
  const intl = useIntl();
  const { onClear, onConfirm, disabled, footerRender } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-core-dropdown-footer');
  const { wrapSSR, hashId } = useStyle(prefixCls);
  const defaultFooter = [
    <Button
      key="clear"
      disabled={disabled}
      size="small"
      style={{
        visibility: onClear ? 'visible' : 'hidden',
      }}
      type="link"
      onClick={(e) => {
        if (onClear) {
          onClear(e);
        }
        e.stopPropagation();
      }}
    >
      {intl.getMessage('form.lightFilter.clear', '清除')}
    </Button>,
    <Button key="confirm" data-type="confirm" disabled={disabled} size="small" type="primary" onClick={onConfirm}>
      {intl.getMessage('form.lightFilter.confirm', '确认')}
    </Button>,
  ];

  if (footerRender === false || footerRender?.(onConfirm, onClear) === false) {
    return null;
  }

  const renderDom = footerRender?.(onConfirm, onClear) || defaultFooter;

  return wrapSSR(
    <div
      className={classNames(prefixCls, hashId)}
      onClick={(e) => (e.target as Element).getAttribute('data-type') !== 'confirm' && e.stopPropagation()}
    >
      {renderDom}
    </div>,
  );
};

export { DropdownFooter };
