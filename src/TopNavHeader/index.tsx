import './index.less';

import React, { Component } from 'react';
import { SiderMenuProps, defaultRenderLogo } from '../SiderMenu/SiderMenu';

import BaseMenu from '../SiderMenu/BaseMenu';
import { HeaderViewProps } from '../Header';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';

export interface TopNavHeaderProps extends SiderMenuProps {
  logo?: React.ReactNode;
  onCollapse?: (collapse: boolean) => void;
  rightContentRender?: HeaderViewProps['rightContentRender'];
}

interface TopNavHeaderState {
  maxWidth?: number;
}

export default class TopNavHeader extends Component<
  TopNavHeaderProps,
  TopNavHeaderState
> {
  static getDerivedStateFromProps(
    props: TopNavHeaderProps,
  ): TopNavHeaderState | null {
    const { contentWidth } = props;
    return {
      maxWidth:
        (contentWidth === 'Fixed' && window.innerWidth > 1200
          ? 1200
          : window.innerWidth) -
        280 -
        120 -
        40,
    };
  }

  state: TopNavHeaderState = {};

  maim: HTMLDivElement | null = null;

  render(): React.ReactNode {
    const {
      theme,
      menuData,
      logo,
      title,
      contentWidth,
      rightContentRender,
    } = this.props;
    const { maxWidth } = this.state;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    const baseClassName = 'ant-pro-top-nav-header';
    return (
      <div className={`${baseClassName} ${theme === 'light' ? 'light' : ''}`}>
        <div
          ref={ref => {
            this.maim = ref;
          }}
          className={`${baseClassName}-main ${
            contentWidth === 'Fixed' ? 'wide' : ''
          }`}
        >
          <div className={`${baseClassName}-left`}>
            <div className={`${baseClassName}-logo`} key="logo" id="logo">
              <a>
                {defaultRenderLogo(logo)}
                <h1>{title}</h1>
              </a>
            </div>
          </div>
          <div
            style={{ maxWidth, flex: 1 }}
            className={`${baseClassName}-menu`}
          >
            <BaseMenu {...this.props} flatMenuKeys={flatMenuKeys} />
          </div>
          {rightContentRender &&
            rightContentRender({
              ...this.props,
            })}
        </div>
      </div>
    );
  }
}
