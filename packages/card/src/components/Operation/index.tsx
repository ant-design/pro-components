import { ConfigProvider } from 'antd';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { useStyle } from './style';

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

  children?: any;
}

const ProCardOperation: React.FC<ProCardOperationProps> = (props) => {
  const { className, style = {}, children } = props;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-card-operation');
  const { wrapSSR, hashId } = useStyle(prefixCls);
  const classString = classNames(prefixCls, className, hashId);

  return wrapSSR(
    <div className={classString} style={style}>
      {children}
    </div>,
  );
};

export default ProCardOperation;
