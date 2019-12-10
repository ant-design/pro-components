import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';

import {
  SiderMenuProps,
  defaultRenderLogoAndTitle,
} from '../SiderMenu/SiderMenu';
import './index.less';

import BaseMenu from '../SiderMenu/BaseMenu';
import { HeaderViewProps } from '../Header';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';

export interface TopNavHeaderProps extends SiderMenuProps {
  logo?: React.ReactNode;
  onCollapse?: (collapse: boolean) => void;
  rightContentRender?: HeaderViewProps['rightContentRender'];
}

const TopNavHeader: React.FC<TopNavHeaderProps> = props => {
  const ref = useRef(null);
  const {
    theme,
    menuData,
    onMenuHeaderClick,
    contentWidth,
    rightContentRender,
    logo,
    title,
    menuHeaderRender,
    className: propsClassName,
    style,
  } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  const baseClassName = 'ant-pro-top-nav-header';
  const headerDom = defaultRenderLogoAndTitle(logo, title, menuHeaderRender);

  const className = classNames(baseClassName, propsClassName, {
    light: theme === 'light',
  });

  const [contentSize, setContentSize] = useState<number | string>('100%');

  return (
    <div className={className} style={style}>
      <div
        ref={ref}
        className={`${baseClassName}-main ${
          contentWidth === 'Fixed' ? 'wide' : ''
        }`}
      >
        {headerDom && (
          <div className={`${baseClassName}-left`} onClick={onMenuHeaderClick}>
            <div className={`${baseClassName}-logo`} key="logo" id="logo">
              {headerDom}
            </div>
          </div>
        )}
        <div
          style={{ flex: 1, maxWidth: contentSize }}
          className={`${baseClassName}-menu`}
        >
          <ResizeObserver
            onResize={({ width }) => {
              setContentSize(width);
            }}
          >
            <BaseMenu
              {...props}
              {...props.menuProps}
              flatMenuKeys={flatMenuKeys}
            />
          </ResizeObserver>
        </div>
        {rightContentRender &&
          rightContentRender({
            ...props,
          })}
      </div>
    </div>
  );
};

export default TopNavHeader;
