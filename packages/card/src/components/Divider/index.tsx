import { ConfigProvider } from 'antd';

import classNames from 'classnames';
import React, { useContext } from 'react';
import useStyle from './style';
export type ProCardDividerProps = {
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
  /**
   * 布局类型
   *
   * @default vertical
   */
  type?: 'horizontal' | 'vertical';
};

const ProCardDivider: React.FC<ProCardDividerProps> = (props) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const proCardPrefixCls = getPrefixCls('pro-card');
  const prefixCls = `${proCardPrefixCls}-divider`;
  const { wrapSSR, hashId } = useStyle(proCardPrefixCls);

  const { className, style = {}, type } = props;

  const classString = classNames(prefixCls, className, hashId, {
    [`${prefixCls}-${type}`]: type,
  });

  return wrapSSR(<div className={classString} style={style} />);
};

export default ProCardDivider;
