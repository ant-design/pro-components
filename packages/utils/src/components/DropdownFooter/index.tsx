import React, { useContext } from 'react';
import { Button, ConfigProvider } from 'antd';
import { useIntl } from '@ant-design/pro-provider';

import './index.less';

type OnClick = (e: React.MouseEvent) => void;

export type DropdownFooterProps = {
  onClear?: OnClick;
  onConfirm?: OnClick;
  disabled?: boolean;
  content?: (onConfirm?: OnClick, onClear?: OnClick) => JSX.Element;
};

const DropdownFooter: React.FC<DropdownFooterProps> = (props) => {
  const intl = useIntl();
  const { onClear, onConfirm, disabled, content } = props;
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

  const renderDom = content?.(onConfirm, onClear) || defaultFooter;

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
