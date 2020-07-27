import React from 'react';
import classnames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider/context';
import './index.less';

/**
 * 默认的 index 列容器，提供一个好看的 index
 * @param param0
 */
const IndexColumn: React.FC<{ border?: boolean }> = ({ border = false, children }) => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const className = getPrefixCls('pro-table-index-column');
      return (
        <div
          className={classnames(className, {
            [`${className}-border`]: border,
            'top-three': (children as number) > 2,
          })}
        >
          {children}
        </div>
      );
    }}
  </ConfigConsumer>
);

export default IndexColumn;
