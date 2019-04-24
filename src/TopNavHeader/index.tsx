import { SiderMenuProps } from '../SiderMenu/SiderMenu';
import React, { Component } from 'react';
import BaseMenu from '../SiderMenu/BaseMenu';
import { defaultRenderLogo } from '../SiderMenu/SiderMenu';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import { HeaderViewProps } from '../Header';
import './index.less';

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
  static getDerivedStateFromProps(props: TopNavHeaderProps) {
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

  render() {
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
          ref={ref => (this.maim = ref)}
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
          <div style={{ maxWidth, flex: 1 }}>
            <BaseMenu
              {...this.props}
              flatMenuKeys={flatMenuKeys}
              className={`${baseClassName}-menu`}
            />
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
