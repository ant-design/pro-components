import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import type { SiderMenuProps, PrivateSiderMenuProps } from '../SiderMenu/SiderMenu';
import { defaultRenderLogoAndTitle } from '../SiderMenu/SiderMenu';
import './index.less';

import BaseMenu from '../SiderMenu/BaseMenu';
import type { GlobalHeaderProps } from '../GlobalHeader';

export type TopNavHeaderProps = SiderMenuProps & GlobalHeaderProps & PrivateSiderMenuProps;

/**
 * 抽离出来是为了防止 rightSize 经常改变导致菜单 render
 *
 * @param param0
 */
const RightContent: React.FC<TopNavHeaderProps> = ({ rightContentRender, ...props }) => {
  const [rightSize, setRightSize] = useState<number | string>('auto');

  return (
    <div
      style={{
        minWidth: rightSize,
      }}
    >
      <div
        style={{
          paddingRight: 8,
        }}
      >
        <ResizeObserver
          onResize={({ width }: { width: number }) => {
            setRightSize(width);
          }}
        >
          {rightContentRender && (
            <div>
              {rightContentRender({
                ...props,
              })}
            </div>
          )}
        </ResizeObserver>
      </div>
    </div>
  );
};

const TopNavHeader: React.FC<TopNavHeaderProps> = (props) => {
  const ref = useRef(null);
  const {
    theme,
    onMenuHeaderClick,
    contentWidth,
    rightContentRender,
    className: propsClassName,
    style,
    layout,
  } = props;
  const prefixCls = `${props.prefixCls || 'ant-pro'}-top-nav-header`;
  const headerDom = defaultRenderLogoAndTitle(
    { ...props, collapsed: false },
    layout === 'mix' ? 'headerTitleRender' : undefined,
  );

  const className = classNames(prefixCls, propsClassName, {
    light: theme === 'light',
  });

  return (
    <div className={className} style={style}>
      <div ref={ref} className={`${prefixCls}-main ${contentWidth === 'Fixed' ? 'wide' : ''}`}>
        {headerDom && (
          <div className={`${prefixCls}-main-left`} onClick={onMenuHeaderClick}>
            <div className={`${prefixCls}-logo`} key="logo" id="logo">
              {headerDom}
            </div>
          </div>
        )}
        <div style={{ flex: 1 }} className={`${prefixCls}-menu`}>
          <BaseMenu {...props} {...props.menuProps} />
        </div>
        {rightContentRender && <RightContent rightContentRender={rightContentRender} {...props} />}
      </div>
    </div>
  );
};

export default TopNavHeader;
