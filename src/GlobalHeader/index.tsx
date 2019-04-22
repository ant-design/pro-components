import React, { Component } from 'react';
import { Icon } from 'antd';
import debounce from 'lodash/debounce';
import { BasicLayoutProps } from '../BasicLayout';
import { defaultRenderLogo } from '../SiderMenu/SiderMenu';
import { HeaderViewProps } from '../Header';
import './index.less';

export interface GlobalHeaderProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: React.ReactNode;
  renderLogo?: BasicLayoutProps['renderLogo'];
  onLogoClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  renderRightContent?: HeaderViewProps['renderRightContent'];
}

export default class GlobalHeader extends Component<GlobalHeaderProps> {
  triggerResizeEvent = debounce(() => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  });
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    if (onCollapse) onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  render() {
    const {
      collapsed,
      isMobile,
      logo,
      renderRightContent,
      renderLogo,
      onLogoClick,
    } = this.props;
    return (
      <div className="ant-pro-global-header">
        {isMobile && (
          <a
            className="ant-pro-global-header-logo"
            key="logo"
            onClick={e => onLogoClick && onLogoClick(e)}
          >
            {defaultRenderLogo(logo, renderLogo)}
          </a>
        )}
        <span className="ant-pro-global-header-trigger" onClick={this.toggle}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </span>
        {renderRightContent && renderRightContent(this.props)}
      </div>
    );
  }
}
