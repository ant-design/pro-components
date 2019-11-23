import './Header.less';

import React, { Component } from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';

import { BasicLayoutProps } from './BasicLayout';
import GlobalHeader, { GlobalHeaderProps } from './GlobalHeader';
import { Settings } from './defaultSettings';
import TopNavHeader from './TopNavHeader';
import { WithFalse } from './typings';

const { Header } = Layout;

export interface HeaderViewProps extends Partial<Settings>, GlobalHeaderProps {
  isMobile?: boolean;
  collapsed?: boolean;
  logo?: React.ReactNode;
  autoHideHeader?: boolean;
  menuRender?: BasicLayoutProps['menuRender'];
  headerRender?: BasicLayoutProps['headerRender'];
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  siderWidth?: number;
}

interface HeaderViewState {
  visible: boolean;
}

class HeaderView extends Component<HeaderViewProps, HeaderViewState> {
  static getDerivedStateFromProps(
    props: HeaderViewProps,
    state: HeaderViewState,
  ): HeaderViewState | null {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  state = {
    visible: true,
  };

  ticking: boolean = false;

  oldScrollTop: number = 0;

  componentDidMount(): void {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount(): void {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const {
      collapsed,
      isMobile,
      layout,
      fixSiderbar,
      siderWidth = 256,
    } = this.props;
    if (fixSiderbar && !isMobile && layout === 'sidemenu') {
      return collapsed ? 'calc(100% - 80px)' : `calc(100% - ${siderWidth}px)`;
    }
    return '100%';
  };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop =
      document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
        } else if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        } else if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
  };

  renderContent = () => {
    const { isMobile, onCollapse, navTheme, layout, headerRender } = this.props;
    const isTop = layout === 'topmenu';
    let defaultDom = <GlobalHeader onCollapse={onCollapse} {...this.props} />;
    if (isTop && !isMobile) {
      defaultDom = (
        <TopNavHeader
          theme={navTheme as 'light' | 'dark'}
          mode="horizontal"
          onCollapse={onCollapse}
          {...this.props}
        />
      );
    }
    if (headerRender) {
      return headerRender(this.props, defaultDom);
    }
    return defaultDom;
  };

  render(): React.ReactNode {
    const {
      fixedHeader,
      layout,
      className: propsClassName,
      style,
    } = this.props;
    const { visible } = this.state;

    const isTop = layout === 'topmenu';

    const className = classNames(propsClassName, {
      'ant-pro-fixed-header': fixedHeader,
      'ant-pro-top-menu': isTop,
    });

    return visible ? (
      <Header
        style={{ padding: 0, width: this.getHeadWidth(), zIndex: 9, ...style }}
        className={className}
      >
        {this.renderContent()}
      </Header>
    ) : null;
  }
}

export default HeaderView;
