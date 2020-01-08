import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { debounce } from '../utils/utils';

import {
  SiderMenuProps,
  defaultRenderLogoAndTitle,
} from '../SiderMenu/SiderMenu';
import './index.less';

import BaseMenu from '../SiderMenu/BaseMenu';
import { HeaderViewProps } from '../Header';

export interface TopNavHeaderProps extends SiderMenuProps {
  logo?: React.ReactNode;
  onCollapse?: (collapse: boolean) => void;
  rightContentRender?: HeaderViewProps['rightContentRender'];
}

const TopNavHeader: React.FC<TopNavHeaderProps> = props => {
  const ref = useRef(null);
  const {
    theme,
    onMenuHeaderClick,
    contentWidth,
    rightContentRender,
    className: propsClassName,
    style,
  } = props;
  const baseClassName = 'ant-pro-top-nav-header';
  const headerDom = defaultRenderLogoAndTitle(props);

  const className = classNames(baseClassName, propsClassName, {
    light: theme === 'light',
  });
  const [rightSize, setRightSize] = useState<number | string>('auto');
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
          style={{ flex: 1, overflow: 'hidden' }}
          className={`${baseClassName}-menu`}
        >
          <BaseMenu {...props} {...props.menuProps} />
        </div>
        {rightContentRender && (
          <div
            style={{
              minWidth: rightSize,
            }}
          >
            <ResizeObserver
              onResize={debounce(({ width }: { width: number }) => {
                if (!width) {
                  return;
                }
                setRightSize(width);
              }, 200)}
            >
              <div
                style={{
                  paddingRight: 8,
                }}
              >
                {rightContentRender({
                  ...props,
                })}
              </div>
            </ResizeObserver>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavHeader;
