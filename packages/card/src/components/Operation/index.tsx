import React from 'react';
import classNames from 'classnames';
import getPrefixCls from '../_util/getPrefixCls';

export interface StatisticCardOperationProps {
  /**
   * @description 自定义前缀
   * @ignore
   */
  prefixCls?: string;
  /**
   * @description 样式
   * @ignore
   */
  style?: React.CSSProperties;
  /**
   * @description className
   * @ignore
   */
  className?: string;
}

const StatisticCardOperation: React.FC<StatisticCardOperationProps> = (props) => {
  const { prefixCls: customizePrefixCls, className, style = {}, children } = props;

  const prefixCls = getPrefixCls('statistic-card-operation', customizePrefixCls);
  const classString = classNames(prefixCls, className);

  return (
    <div className={classString} style={style}>
      {children}
    </div>
  );
};

export default StatisticCardOperation;
