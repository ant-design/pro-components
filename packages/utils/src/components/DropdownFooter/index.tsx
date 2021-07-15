import React, { useContext } from 'react';
import { Button, ConfigProvider } from 'antd';
import { useIntl } from '@ant-design/pro-provider';

import './index.less';

type LightFilterFooterRender =
  | ((
      onConfirm?: (e?: React.MouseEvent) => void,
      onClear?: (e?: React.MouseEvent) => void,
    ) => JSX.Element)
  | false;

type OnClick = (e?: React.MouseEvent) => void;

export type DropdownFooterProps = {
  onClear?: OnClick;
  onConfirm?: OnClick;
  disabled?: boolean;
  footerRender?: LightFilterFooterRender;
};

const DropdownFooter: React.FC<DropdownFooterProps> = (props) => {
  const intl = useIntl();
  const { onClear, onConfirm, disabled, footerRender } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-core-dropdown-footer');
  const defaultFooter = [
    <Button
      key="clear"
      style={{
        visibility: onClear ? 'visible' : 'hidden',
      }}
      type="link"
      size="small"
      disabled={disabled}
      onClick={(e) => {
        if (onClear) {
          onClear(e);
        }
        e.stopPropagation();
      }}
    >
      {intl.getMessage('form.lightFilter.clear', '清除')}
    </Button>,
    <Button
      key="confirm"
      data-type="confirm"
      type="primary"
      size="small"
      onClick={onConfirm}
      disabled={disabled}
    >
      {intl.getMessage('form.lightFilter.confirm', '确认')}
    </Button>,
  ];

  if (footerRender === false) {
    return null;
  }

  const renderDom = (footerRender && footerRender(onConfirm, onClear)) || defaultFooter;

  return (
    <div
      className={prefixCls}
      onClick={(e) =>
        (e.target as Element).getAttribute('data-type') !== 'confirm' && e.stopPropagation()
      }
    >
      {renderDom}
    </div>
  );
};

export default DropdownFooter;
