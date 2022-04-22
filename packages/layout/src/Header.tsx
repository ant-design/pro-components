import React, { useContext } from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';
import type { GlobalHeaderProps } from './components/GlobalHeader';
import { GlobalHeader } from './components/GlobalHeader';
import { TopNavHeader } from './components/TopNavHeader';
import type { WithFalse } from './typings';
import type { PrivateSiderMenuProps } from './components/SiderMenu/SiderMenu';
import { clearMenuItem } from './utils/utils';
import { cx, css } from './emotion';
import type { LayoutDesignToken } from './ProLayoutContext';
import { DefaultDesignToken } from './ProLayoutContext';
import { ProLayoutContext } from './ProLayoutContext';

const { Header } = Layout;

const ProLayoutFixedHeaderCss = css`
  position: fixed;
  top: 0;
  padding: 0;
  background: transparent;
`;

const getProLayoutHeaderCss = (designToken: LayoutDesignToken) => {
  const defaultHeaderCss = css`
    z-index: 9;
    width: 100%;
    padding: 0 8px;
    backdrop-filter: blur(20px) saturate(150%);
    border-bottom: 1px solid ${designToken.borderColorSplit};
    transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    background-color: ${designToken.layoutBgColor};
    @supports (backdrop-filter: blur(20px) saturate(150%)) {
      background-color: transparent;
      backdrop-filter: blur(20px) saturate(150%);
    }
  `;
  if (designToken.header.headerBgColor !== DefaultDesignToken.header.headerBgColor) {
    return (
      defaultHeaderCss &&
      css`
        background-color: ${designToken.header.headerBgColor};
        @supports (backdrop-filter: blur(20px) saturate(150%)) {
          background-color: ${designToken.header.headerBgColor};
        }
      `
    );
  }
  return defaultHeaderCss;
};

export type HeaderViewProps = GlobalHeaderProps & {
  isMobile?: boolean;
  logo?: React.ReactNode;
  headerRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  headerTitleRender?: WithFalse<
    (logo: React.ReactNode, title: React.ReactNode, props: HeaderViewProps) => React.ReactNode
  >;
  headerContentRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  siderWidth?: number;
  hasSiderMenu?: boolean;
};

const DefaultHeader: React.FC<HeaderViewProps & PrivateSiderMenuProps> = (props) => {
  const designToken = useContext(ProLayoutContext);

  const renderContent = () => {
    const { isMobile, onCollapse, navTheme, layout, headerRender, headerContentRender } = props;
    const isTop = layout === 'top';
    const clearMenuData = clearMenuItem(props.menuData || []);

    let defaultDom = (
      <GlobalHeader onCollapse={onCollapse} {...props} menuData={clearMenuData}>
        {headerContentRender && headerContentRender(props, null)}
      </GlobalHeader>
    );

    if (isTop && !isMobile) {
      defaultDom = (
        <TopNavHeader
          theme={navTheme as 'light' | 'dark'}
          mode="horizontal"
          onCollapse={onCollapse}
          {...props}
          menuData={clearMenuData}
        />
      );
    }
    if (headerRender && typeof headerRender === 'function') {
      return headerRender(props, defaultDom);
    }
    return defaultDom;
  };

  const getHeaderActionsCss = () => {
    const propsClassName = props.className;
    return css`
      .${propsClassName}-header-actions {
        display: flex;
        align-items: center;
        font-size: 16;
        cursor: pointer;
        &-item {
          padding: 0 8px;
          &:hover {
            color: ${designToken.colorText};
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

  const {
    fixedHeader,
    layout,
    className: propsClassName,
    style,
    collapsed,
    prefixCls,
    headerHeight,
  } = props;
  const needFixedHeader = fixedHeader || layout === 'mix';
  const isTop = layout === 'top';

  const className = classNames(propsClassName, {
    [`${prefixCls}-fixed-header`]: needFixedHeader,
    [`${prefixCls}-fixed-header-action`]: !collapsed,
    [`${prefixCls}-top-menu`]: isTop,
    [`${prefixCls}-header`]: true,
  });

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
          getProLayoutHeaderCss(designToken),
          getHeaderActionsCss(),
          needFixedHeader && ProLayoutFixedHeaderCss,
          css({
            height: headerHeight,
            lineHeight: `${headerHeight}px`,
            width: '100%',
            zIndex: layout === 'mix' ? 100 : 19,
            right,
            ...style,
          }),
        )}
      >
        {renderContent()}
      </Header>
    </>
  );
};

export { DefaultHeader };
