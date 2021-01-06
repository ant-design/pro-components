import React, { useContext } from 'react';
import { ConfigProvider } from 'antd';
import classNames from 'classnames';

import './index.less';

export type ProCardDividerProps = {
  /**
   * 自定义前缀
   *
   * @ignore
   */
  prefixCls?: string;
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
};

const ProCardDivider: React.FC<ProCardDividerProps> = (props) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-card-divider');

  const { className, style = {}, children } = props;

  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-line`]: children === undefined,
  });

  return (
    <div className={classString} style={style}>
      {children}
    </div>
  );
};

export default ProCardDivider;
