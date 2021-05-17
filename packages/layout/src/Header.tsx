import './Header.less';

import React, { Component } from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';
import type { GlobalHeaderProps } from './components/GlobalHeader';
import GlobalHeader from './components/GlobalHeader';
import TopNavHeader from './components/TopNavHeader';
import type { WithFalse } from './typings';
import type { PrivateSiderMenuProps } from './components/SiderMenu/SiderMenu';
import { clearMenuItem } from './utils/utils';

const { Header } = Layout;

export type HeaderViewProps = GlobalHeaderProps & {
  isMobile?: boolean;
  collapsed?: boolean;
  logo?: React.ReactNode;
  headerRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  headerTitleRender?: WithFalse<
    (logo: React.ReactNode, title: React.ReactNode, props: HeaderViewProps) => React.ReactNode
  >;
  headerContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  siderWidth?: number;
  hasSiderMenu?: boolean;
};

type HeaderViewState = {
  visible: boolean;
};

class HeaderView extends Component<HeaderViewProps & PrivateSiderMenuProps, HeaderViewState> {
  renderContent = () => {
    const { isMobile, onCollapse, navTheme, layout, headerRender, headerContentRender } =
      this.props;
    const isTop = layout === 'top';
    const clearMenuData = clearMenuItem(this.props.menuData || []);
    let defaultDom = (
      <GlobalHeader onCollapse={onCollapse} {...this.props} menuData={clearMenuData}>
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
          menuData={clearMenuData}
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
      navTheme,
      collapsed,
      siderWidth,
      hasSiderMenu,
      isMobile,
      prefixCls,
      headerHeight,
    } = this.props;
    const needFixedHeader = fixedHeader || layout === 'mix';
    const isTop = layout === 'top';

    const needSettingWidth = needFixedHeader && hasSiderMenu && !isTop && !isMobile;

    const className = classNames(propsClassName, {
      [`${prefixCls}-fixed-header`]: needFixedHeader,
      [`${prefixCls}-fixed-header-action`]: !collapsed,
      [`${prefixCls}-top-menu`]: isTop,
      [`${prefixCls}-header-${navTheme}`]: navTheme && layout !== 'mix',
    });

    /** 计算侧边栏的宽度，不然导致左边的样式会出问题 */
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
            zIndex: layout === 'mix' ? 100 : 19,
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
