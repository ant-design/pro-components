import './index.less';

import React, { Component } from 'react';
import {
  SiderMenuProps,
  defaultRenderLogoAndTitle,
} from '../SiderMenu/SiderMenu';

import BaseMenu from '../SiderMenu/BaseMenu';
import { HeaderViewProps } from '../Header';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import { isBrowser } from '../utils/utils';

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
    const innerWidth = isBrowser() ? window.innerWidth : 0;
    return {
      maxWidth:
        (contentWidth === 'Fixed' && innerWidth > 1200 ? 1200 : innerWidth) -
        280 -
        120,
    };
  }

  state: TopNavHeaderState = {};

  maim: HTMLDivElement | null = null;

  render(): React.ReactNode {
    const {
      theme,
      menuData,
      onMenuHeaderClick,
      contentWidth,
      rightContentRender,
      logo,
      title,
      menuHeaderRender,
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
          <div className={`${baseClassName}-left`} onClick={onMenuHeaderClick}>
            <div className={`${baseClassName}-logo`} key="logo" id="logo">
              {defaultRenderLogoAndTitle(logo, title, menuHeaderRender)}
            </div>
          </div>
          <div
            style={{ maxWidth, flex: 1 }}
            className={`${baseClassName}-menu`}
          >
            <BaseMenu {...this.props} flatMenuKeys={flatMenuKeys} type="top" />
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
