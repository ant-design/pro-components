import type { CSSProperties } from 'react';
import React, { useContext } from 'react';
import { ConfigProvider } from 'antd';

import { RouteContext } from '../../RouteContext';
import type { PureSettings } from '../../defaultSettings';
import { css, cx } from '../../emotion';

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
  const isWide = contentWidth === 'Fixed';

  return (
    <div
      className={cx(
        className,
        propsClassName,
        {
          wide: isWide,
        },
        css`
          width: 100%;
          .${prefixCls}-card:not(.${prefixCls}-card-ghost) {
            border-radius: 6px;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(25, 15, 15, 0.07),
              0 0 1px 0 rgba(0, 0, 0, 0.08);
          }
        `,
        isWide &&
          css`
            max-width: 1152px;
            margin: 0 auto;
          `,
      )}
      style={style}
    >
      <div className={`${prefixCls}-grid-content-children`}>{children}</div>
    </div>
  );
};

export { GridContent };
