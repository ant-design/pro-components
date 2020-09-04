import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from 'antd/lib/config-provider';
import './index.less';

export interface BatchOperationBarProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'default' | 'large';
  description?: React.ReactNode;
  selectedCount?: number;
  visible?: boolean;
  actions?: React.ReactNode[];
  onCancel?: () => void;
  selectedText?: string;
  cancelText?: string;
}

const BatchOperationBar: React.FC<BatchOperationBarProps> = ({
  prefixCls: customizePrefixCls,
  description,
  className,
  style,
  actions = [],
  selectedCount = 0,
  visible,
  onCancel,
  size = 'default',
  selectedText,
  cancelText,
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pro-core-batch-operation', customizePrefixCls);
  const realVisible = visible === undefined ? selectedCount > 0 : visible;
  return (
    <div
      style={{
        display: realVisible ? 'flex' : 'none',
        ...style,
      }}
      className={classNames(`${prefixCls}-container`, `${prefixCls}-${size}`, className)}
    >
      <div className={`${prefixCls}-left`}>
        <div className={`${prefixCls}-title`}>
          {(selectedText || '已选 {selectedCount} 项').replace(
            '{selectedCount}',
            `${selectedCount}`,
          )}
          {onCancel && (
            <span className={`${prefixCls}-cancel`} onClick={onCancel}>
              {cancelText || '取消选择'}
            </span>
          )}
        </div>
        {description && <div className={`${prefixCls}-subtitle`}>{description}</div>}
      </div>
      <div className={`${prefixCls}-right`}>
        {actions.map((action, index) => {
          return (
            <div key={index} className={`${prefixCls}-action-item`}>
              {action}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BatchOperationBar;
