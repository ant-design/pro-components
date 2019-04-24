import GlobalHeader from './GlobalHeader';
import TopNavHeader from './TopNavHeader';
import React, { Component } from 'react';
import { Layout } from 'antd';
import { WithFalse } from './typings';
import './Header.less';
import { Settings } from './defaultSettings';

const { Header } = Layout;

export interface HeaderViewProps extends Partial<Settings> {
  isMobile?: boolean;
  collapsed?: boolean;
  logo?: React.ReactNode;
  autoHideHeader?: boolean;
  renderRightContent?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  handleMenuCollapse?: (collapse: boolean) => void;
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
    const { isMobile, collapsed, fixedHeader, layout } = this.props;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
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

  render() {
    const {
      isMobile,
      handleMenuCollapse,
      navTheme,
      layout,
      fixedHeader,
    } = this.props;
    const { visible } = this.state;
    const isTop = layout === 'topmenu';
    const width = this.getHeadWidth();
    const HeaderDom = visible ? (
      <Header
        style={{ padding: 0, width, zIndex: 2 }}
        className={fixedHeader ? 'ant-pro-fixed-header' : ''}
      >
        {isTop && !isMobile ? (
          <TopNavHeader
            theme={navTheme}
            mode="horizontal"
            onCollapse={handleMenuCollapse}
            {...this.props}
          />
        ) : (
          <GlobalHeader onCollapse={handleMenuCollapse} {...this.props} />
        )}
      </Header>
    ) : null;
    return HeaderDom;
  }
}

export default HeaderView;
