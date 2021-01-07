import './GridContent.less';

import type { CSSProperties } from 'react';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigProvider } from 'antd';

import RouteContext from '../../RouteContext';
import type { PureSettings } from '../../defaultSettings';

type GridContentProps = {
  contentWidth?: PureSettings['contentWidth'];
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  prefixCls?: string;
};

/**
 * This component can support contentWidth so you don't need to calculate the width
 * contentWidth=Fixed, width will is 1200
 *
 * @param props
 */
const GridContent: React.FC<GridContentProps> = (props) => {
  const value = useContext(RouteContext);
  const { children, contentWidth: propsContentWidth, className: propsClassName, style } = props;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = props.prefixCls || getPrefixCls('pro');
  const contentWidth = propsContentWidth || value.contentWidth;
  const className = `${prefixCls}-grid-content`;

  return (
    <div
      className={classNames(className, propsClassName, {
        wide: contentWidth === 'Fixed',
      })}
      style={style}
    >
      <div className={`${prefixCls}-grid-content-children`}>{children}</div>
    </div>
  );
};

export default GridContent;
