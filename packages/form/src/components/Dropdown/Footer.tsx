import React from 'react';
import { Button } from 'antd';

import './Footer.less';

export interface FooterProps {
  /**
   * 自定义前缀
   */
  prefixCls?: string;
  onClear?: (e: React.MouseEvent) => void;
  onConfirm?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

const Footer: React.FC<FooterProps> = (props) => {
  const { prefixCls, onClear, onConfirm, disabled } = props;

  // TODO 国际化
  const locale = {
    clear: '清除',
    confirm: '确认',
  };

  return (
    <div
      className={`${prefixCls}-footer`}
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
        {locale.clear}
      </Button>
      <Button
        data-type="confirm"
        type="primary"
        size="small"
        onClick={onConfirm}
        disabled={disabled}
      >
        {locale.confirm}
      </Button>
    </div>
  );
};

export default Footer;
