import GlobalHeader from './GlobalHeader';
import TopNavHeader from './TopNavHeader';
import React, { Component } from 'react';
import { Layout } from 'antd';
import { WithFalse } from './typings';
import { BasicLayoutProps } from './BasicLayout';
import './Header.less';
import { Settings } from './defaultSettings';

const { Header } = Layout;

export interface HeaderViewProps extends Partial<Settings> {
  isMobile?: boolean;
  collapsed?: boolean;
  logo?: React.ReactNode;
  autoHideHeader?: boolean;
  headerRender?: BasicLayoutProps['headerRender'];
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  handleMenuCollapse?: (collapse: boolean) => void;
  siderWidth?: number;
}

interface HeaderViewState {
  visible: boolean;
}

class HeaderView extends Component<HeaderViewProps, HeaderViewState> {
  static getDerivedStateFromProps(
    props: HeaderViewProps,
    state: HeaderViewState,
  ) {
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

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const {
      isMobile,
      collapsed,
      fixedHeader,
      layout,
      siderWidth = 256,
    } = this.props;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : `calc(100% - ${siderWidth}px)`;
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
    const {
      isMobile,
      handleMenuCollapse,
      navTheme,
      layout,
      headerRender,
    } = this.props;
    const isTop = layout === 'topmenu';
    let defaultDom = (
      <GlobalHeader onCollapse={handleMenuCollapse} {...this.props} />
    );
    if (isTop && !isMobile) {
      defaultDom = (
        <TopNavHeader
          theme={navTheme}
          mode="horizontal"
          onCollapse={handleMenuCollapse}
          {...this.props}
        />
      );
    }
    if (headerRender) {
      return headerRender(this.props);
    } else {
      return defaultDom;
    }
  };
  render() {
    const { fixedHeader } = this.props;
    const { visible } = this.state;
    const width = this.getHeadWidth();
    return visible ? (
      <Header
        style={{ padding: 0, width, zIndex: 2 }}
        className={fixedHeader ? 'ant-pro-fixed-header' : ''}
      >
        {this.renderContent()}
      </Header>
    ) : null;
  }
}

export default HeaderView;
