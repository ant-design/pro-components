import { SiderMenuProps } from '../SiderMenu/SiderMenu';
import React, { Component } from 'react';
import BaseMenu from '../SiderMenu/BaseMenu';
import { defaultRenderLogo } from '../SiderMenu/SiderMenu';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import { HeaderViewProps } from '../Header';
import './index.less';

export interface TopNavHeaderProps extends SiderMenuProps {
  logo?: React.ReactNode;
  onLogoClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onCollapse?: (collapse: boolean) => void;
  renderRightContent?: HeaderViewProps['renderRightContent'];
}

interface TopNavHeaderState {
  maxWidth?: number;
}

export default class TopNavHeader extends Component<
  TopNavHeaderProps,
  TopNavHeaderState
> {
  static getDerivedStateFromProps(props: TopNavHeaderProps) {
    const { settings } = props;
    return {
      maxWidth:
        (settings!.contentWidth === 'Fixed' && window.innerWidth > 1200
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
      onLogoClick,
      settings,
      renderLogo,
      renderRightContent,
    } = this.props;
    const { maxWidth } = this.state;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    const baseClassName = 'ant-pro-top-nav-header';
    return (
      <div className={`${baseClassName} ${theme === 'light' ? 'light' : ''}`}>
        <div
          ref={ref => (this.maim = ref)}
          className={`${baseClassName}-main ${
            settings!.contentWidth === 'Fixed' ? 'wide' : ''
          }`}
        >
          <div className={`${baseClassName}-left`}>
            <div className={`${baseClassName}-logo`} key="logo" id="logo">
              <a onClick={e => onLogoClick && onLogoClick(e)}>
                {defaultRenderLogo(logo, renderLogo)}
                <h1>{settings!.title}</h1>
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
          {renderRightContent &&
            renderRightContent({
              ...this.props,
            })}
        </div>
      </div>
    );
  }
}
