import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigProvider } from 'antd';

import './index.less';

export interface ProCardOperationProps {
  /**
   * 样式
   *
   * @ignore
   */
  style?: React.CSSProperties;
  /**
   * ClassName
   *
   * @ignore
   */
  className?: string;
}

const ProCardOperation: React.FC<ProCardOperationProps> = (props) => {
  const { className, style = {}, children } = props;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-card-operation');

  const classString = classNames(prefixCls, className);

  return (
    <div className={classString} style={style}>
      {children}
    </div>
  );
};

export default ProCardOperation;
