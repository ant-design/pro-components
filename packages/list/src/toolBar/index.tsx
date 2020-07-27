import React from 'react';
import { Space } from 'antd';
import './index.less';

export interface ToolBarProps<T = unknown> {
  title?: React.ReactNode;
  actions?: React.ReactNode[];
  className?: string;
}

const ToolBar = <T, U = {}>({ title, actions, className }: ToolBarProps<T>) => {
  return (
    <div className={className}>
      <div className={`${className}-title`}>{title}</div>
      <div className={`${className}-option`}>
        {actions && (
          <Space>
            {actions
              .filter((item) => item)
              .map((node, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                >
                  {node}
                </div>
              ))}
          </Space>
        )}
      </div>
    </div>
  );
};

export default ToolBar;
