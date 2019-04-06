import { SiderMenuProps } from '../SiderMenu/SiderMenu';
import React, { Component } from 'react';
import Link from 'umi/link';
import BaseMenu from '../SiderMenu/BaseMenu';
import { renderLogo } from '../SiderMenu/SiderMenu';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import styles from './index.less';

import { Settings } from '../defaultSettings';

export interface TopNavHeaderProps extends SiderMenuProps {
  logo: React.ReactNode;
  settings: Settings;
  onCollapse?: (collapse: boolean) => void;
  renderRightContent: (props: any) => React.ReactNode;
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
    return (
      <div className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}>
        <div
          ref={ref => (this.maim = ref)}
          className={`${styles.main} ${settings.contentWidth === 'Fixed' ? styles.wide : ''}`}
        >
          <div className={styles.left}>
            <div className={styles.logo} key="logo" id="logo">
              <Link to="/">
                {renderLogo(logo)}
                <h1>{settings.title}</h1>
              </Link>
            </div>
            <div style={{ maxWidth }}>
              <BaseMenu {...this.props} flatMenuKeys={flatMenuKeys} className={styles.menu} />
            </div>
          </div>
          {renderRightContent({
            ...this.props,
          })}
        </div>
      </div>
    );
  }
}
