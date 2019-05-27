import './index.less';

import React, { Component } from 'react';

import { Icon } from 'antd';
import debounce from 'lodash/debounce';
import { HeaderViewProps } from '../Header';
import { defaultRenderLogo } from '../SiderMenu/SiderMenu';

export interface GlobalHeaderProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: React.ReactNode;
  rightContentRender?: HeaderViewProps['rightContentRender'];
}

export default class GlobalHeader extends Component<GlobalHeaderProps> {
  triggerResizeEvent = debounce(() => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  });

  componentWillUnmount(): void {
    this.triggerResizeEvent.cancel();
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    if (onCollapse) onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  render(): React.ReactNode {
    const { collapsed, isMobile, logo, rightContentRender } = this.props;
    return (
      <div className="ant-pro-global-header">
        {isMobile && (
          <a className="ant-pro-global-header-logo" key="logo">
            {defaultRenderLogo(logo)}
          </a>
        )}
        <span className="ant-pro-global-header-trigger" onClick={this.toggle}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </span>
        {rightContentRender && rightContentRender(this.props)}
      </div>
    );
  }
}
