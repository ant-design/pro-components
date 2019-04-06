import React, { Component } from 'react';
import { Icon } from 'antd';
import Link from 'umi/link';
import debounce from 'lodash/debounce';
import styles from './index.less';

export interface GlobalHeaderProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: string;
  renderRightContent: (props: any) => React.ReactNode;
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
    const { collapsed, isMobile, logo, renderRightContent } = this.props;
    return (
      <div className={styles.globalHeader}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        <span className={styles.trigger} onClick={this.toggle}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </span>
        {renderRightContent && renderRightContent(this.props)}
      </div>
    );
  }
}
