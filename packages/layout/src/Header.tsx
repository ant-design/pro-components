import './Header.less';

import React, { Component } from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';
import GlobalHeader, { GlobalHeaderProps } from './GlobalHeader';
import { PureSettings } from './defaultSettings';
import TopNavHeader from './TopNavHeader';
import { WithFalse } from './typings';

const { Header } = Layout;

export type HeaderViewProps = Partial<PureSettings> &
  GlobalHeaderProps & {
    isMobile?: boolean;
    collapsed?: boolean;
    logo?: React.ReactNode;

    headerRender?: WithFalse<
      (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
    >;
    headerTitleRender?: WithFalse<
      (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
    >;
    headerContentRender?: WithFalse<
      (props: HeaderViewProps) => React.ReactNode
    >;
    siderWidth?: number;
    hasSiderMenu?: boolean;
  };

interface HeaderViewState {
  visible: boolean;
}

class HeaderView extends Component<HeaderViewProps, HeaderViewState> {
  renderContent = () => {
    const {
      isMobile,
      onCollapse,
      navTheme,
      layout,
      headerRender,
      headerContentRender,
    } = this.props;
    const isTop = layout === 'top';
    let defaultDom = (
      <GlobalHeader onCollapse={onCollapse} {...this.props}>
        {headerContentRender && headerContentRender(this.props)}
      </GlobalHeader>
    );
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
    if (headerRender && typeof headerRender === 'function') {
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
      collapsed,
      siderWidth = 208,
      hasSiderMenu,
      headerRender,
      isMobile,
      prefixCls,
      headerHeight
    } = this.props;
    const needFixedHeader = fixedHeader || layout === 'mix';
    const isTop = layout === 'top';

    const needSettingWidth =
      needFixedHeader && hasSiderMenu && !isTop && !isMobile;

    const className = classNames(propsClassName, {
      [`${prefixCls}-fixed-header`]: needFixedHeader,
      [`${prefixCls}-top-menu`]: isTop,
    });

    if (headerRender === false) {
      return null;
    }

    const width =
      layout !== 'mix' && needSettingWidth
        ? `calc(100% - ${collapsed ? 48 : siderWidth}px)`
        : '100%';

    const right = needFixedHeader ? 0 : undefined;

    return (
      <>
        {needFixedHeader && (
          <Header
            style={{
              height: headerHeight,
              lineHeight: `${headerHeight}px`,
              background: 'transparent',
            }}
          />
        )}
        <Header
          style={{
            padding: 0,
            height: headerHeight,
            lineHeight: `${headerHeight}px`,
            width,
            zIndex: layout === 'mix' ? 100 : 9,
            right,
            ...style,
          }}
          className={className}
        >
          {this.renderContent()}
        </Header>
      </>
    );
  }
}

export default HeaderView;
