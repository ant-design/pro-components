import React, { Component } from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';
import type { GlobalHeaderProps } from './components/GlobalHeader';
import { GlobalHeader } from './components/GlobalHeader';
import { TopNavHeader } from './components/TopNavHeader';
import type { WithFalse } from './typings';
import type { PrivateSiderMenuProps } from './components/SiderMenu/SiderMenu';
import { clearMenuItem } from './utils/utils';
import { css, cx } from '@emotion/css';

const { Header } = Layout;

const ProLayoutFixedHeaderCss = css`
  position: fixed;
  top: 0;
  padding: 0;
  background: transparent;
`;

const ProLayoutHeader = css`
  z-index: 9;
  width: 100%;
  background-color: rgba(240, 242, 245, 0.4);
  border-bottom: 1px solid #d8d8d8;
  backdrop-filter: blur(20px) saturate(150%);
  transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

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

class DefaultHeader extends Component<HeaderViewProps & PrivateSiderMenuProps, HeaderViewState> {
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
  getHeaderActionsCss = () => {
    const propsClassName = this.props.className;
    return css`
      .${propsClassName}-header-actions {
        display: flex;
        align-items: center;
        font-size: 16;
        cursor: pointer;
        &-item {
          padding: 0 8px;
          &:hover {
            color: @primary-color;
          }
        }
      }
      .${propsClassName}-header-realDark {
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 65%);
      }
      .${propsClassName}-header-actions-header-action {
        transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    `;
  };
  render(): React.ReactNode {
    const {
      fixedHeader,
      layout,
      className: propsClassName,
      style,
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
      [`${prefixCls}-header`]: true,
    });

    /** 计算侧边栏的宽度，不然导致左边的样式会出问题 */
    const width =
      layout !== 'mix' && needSettingWidth
        ? `calc(100% - ${collapsed ? 60 : siderWidth}px)`
        : '100%';

    const right = needFixedHeader ? 0 : undefined;

    if (layout === 'side') return null;

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
          className={cx(
            className,
            ProLayoutHeader,
            this.getHeaderActionsCss(),
            needFixedHeader && ProLayoutFixedHeaderCss,
            css({
              height: headerHeight,
              lineHeight: `${headerHeight}px`,
              width,
              zIndex: layout === 'mix' ? 100 : 19,
              right,
              ...style,
            }),
          )}
        >
          {this.renderContent()}
        </Header>
      </>
    );
  }
}

export { DefaultHeader };
