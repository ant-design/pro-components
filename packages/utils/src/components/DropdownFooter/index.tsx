import React, { useContext } from 'react';
import { Button } from 'antd';
import { ConfigContext } from 'antd/lib/config-provider';

import './index.less';

export interface DropdownFooterProps {
  onClear?: (e: React.MouseEvent) => void;
  onConfirm?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

const DropdownFooter: React.FC<DropdownFooterProps> = (props) => {
  const { onClear, onConfirm, disabled } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pro-core-dropdown-footer');

  return (
    <div
      className={prefixCls}
      onClick={(e) => {
        if ((e.target as Element).getAttribute('data-type') !== 'confirm') {
          e.stopPropagation();
        }
      }}
    >
      <Button
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
        清除
      </Button>
      <Button
        data-type="confirm"
        type="primary"
        size="small"
        onClick={onConfirm}
        disabled={disabled}
      >
        确认
      </Button>
    </div>
  );
};

export default DropdownFooter;
