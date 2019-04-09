import { SiderMenuProps } from '../SiderMenu/SiderMenu';
import React, { Component } from 'react';
import Link from 'umi/link';
import BaseMenu from '../SiderMenu/BaseMenu';
import { renderLogo } from '../SiderMenu/SiderMenu';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import { Settings } from '../defaultSettings';
import './index.less';

export interface TopNavHeaderProps extends SiderMenuProps {
  logo: React.ReactNode;
  settings: Settings;
  onCollapse?: (collapse: boolean) => void;
  renderRightContent?: (props: any) => React.ReactNode;
}

interface TopNavHeaderState {
  maxWidth?: number;
}

export default class TopNavHeader extends Component<TopNavHeaderProps, TopNavHeaderState> {
  static getDerivedStateFromProps(props: TopNavHeaderProps) {
    const { settings } = props;
    return {
      maxWidth:
        (settings.contentWidth === 'Fixed' && window.innerWidth > 1200 ? 1200 : window.innerWidth) -
        280 -
        120 -
        40,
    };
  }

  state: TopNavHeaderState = {};

  maim: HTMLDivElement | null = null;

  render() {
    const { theme, menuData, logo, settings, renderRightContent } = this.props;
    const { maxWidth } = this.state;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    const baseClassName = 'ant-pro-top-nav-header';
    return (
      <div className={`${baseClassName} ${theme === 'light' ? 'light' : ''}`}>
        <div
          ref={ref => (this.maim = ref)}
          className={`${baseClassName}-main ${settings.contentWidth === 'Fixed' ? 'wide' : ''}`}
        >
          <div className={`${baseClassName}-left`}>
            <div className={`${baseClassName}-logo`} key="logo" id="logo">
              <Link to="/">
                {renderLogo(logo)}
                <h1>{settings.title}</h1>
              </Link>
            </div>
          </div>
          <div style={{ maxWidth, flex: 1 }}>
            <BaseMenu
              {...this.props}
              flatMenuKeys={flatMenuKeys}
              className={`${baseClassName}-menu`}
            />
          </div>
          {renderRightContent &&
            renderRightContent({
              ...this.props,
            })}
        </div>
      </div>
    );
  }
}
