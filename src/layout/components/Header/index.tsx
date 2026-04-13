import { ConfigProvider, Layout } from 'antd';
import { clsx } from 'clsx';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { isNeedOpenHash, ProProvider } from '../../../provider';
import type { WithFalse } from '../../typing';
import { clearMenuItem } from '../../utils/utils';
import type { GlobalHeaderProps } from '../GlobalHeader';
import { GlobalHeader } from '../GlobalHeader';
import type { PrivateSiderMenuProps } from '../SiderMenu/SiderMenu';
import { TopNavHeader } from '../TopNavHeader';
import { useStyle } from './style/header';
import { useStylish } from './style/stylish';

const { Header } = Layout;

export type HeaderViewProps = GlobalHeaderProps & {
  isMobile?: boolean;
  logo?: React.ReactNode;
  headerRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  headerTitleRender?: WithFalse<
    (
      logo: React.ReactNode,
      title: React.ReactNode,
      props: HeaderViewProps,
    ) => React.ReactNode
  >;
  headerContentRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  /**
   * 侧栏布局下顶栏横向菜单：`splitMenus` 时默认为一级菜单；也可单独用来包一层或完全自定义第二参数
   */
  headerMenuRender?: WithFalse<
    (props: HeaderViewProps, defaultMenu: React.ReactNode) => React.ReactNode
  >;
  siderWidth?: number;
  hasSiderMenu?: boolean;
};

const DefaultHeader: React.FC<HeaderViewProps & PrivateSiderMenuProps> = (
  props,
) => {
  const {
    isMobile,
    fixedHeader,
    className: propsClassName,
    style,
    collapsed,
    prefixCls,
    onCollapse,
    layout,
    headerRender,
    headerContentRender,
    splitMenus,
    headerMenuRender,
  } = props;
  const { token } = useContext(ProProvider);
  const context = useContext(ConfigProvider.ConfigContext);
  const [isFixedHeaderScroll, setIsFixedHeaderScroll] = useState(false);
  const needFixedHeader = fixedHeader;

  const renderContent = useCallback(() => {
    const isTop = layout === 'top';
    const clearMenuData = clearMenuItem(props.menuData || []);

    const showSideHeaderMenu =
      layout === 'side' &&
      !isMobile &&
      headerMenuRender !== false &&
      (splitMenus || typeof headerMenuRender === 'function');

    const headerStripMenuData = showSideHeaderMenu
      ? splitMenus
        ? clearMenuItem(
            (props.menuData || []).map((item) => ({
              ...item,
              children: undefined,
              routes: undefined,
            })),
          )
        : clearMenuData
      : clearMenuData;

    const defaultSideHeaderMenu = showSideHeaderMenu ? (
      <TopNavHeader
        mode="horizontal"
        onCollapse={onCollapse}
        {...props}
        layout="top"
        splitMenus={false}
        menuData={headerStripMenuData}
      />
    ) : null;

    const sideHeaderMenuDom =
      showSideHeaderMenu && headerMenuRender
        ? headerMenuRender(props, defaultSideHeaderMenu)
        : defaultSideHeaderMenu;

    let defaultDom = (
      <GlobalHeader onCollapse={onCollapse} {...props} menuData={clearMenuData}>
        {sideHeaderMenuDom}
        {headerContentRender && headerContentRender(props, null)}
      </GlobalHeader>
    );
    if (isTop && !isMobile) {
      defaultDom = (
        <TopNavHeader
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
  }, [
    headerContentRender,
    headerMenuRender,
    headerRender,
    isMobile,
    layout,
    onCollapse,
    props,
    splitMenus,
  ]);
  useEffect(() => {
    const dom = context?.getTargetContainer?.() || document.body;

    const isFixedHeaderFn = () => {
      const scrollTop = (dom as HTMLElement).scrollTop;

      if (
        scrollTop > (token.layout?.header?.heightLayoutHeader || 56) &&
        !isFixedHeaderScroll
      ) {
        setIsFixedHeaderScroll(true);
        return true;
      }
      if (isFixedHeaderScroll) {
        setIsFixedHeaderScroll(false);
      }
      return false;
    };

    if (!needFixedHeader) return;
    if (typeof window === 'undefined') return;
    dom.addEventListener('scroll', isFixedHeaderFn, {
      passive: true,
    });
    return () => {
      dom.removeEventListener('scroll', isFixedHeaderFn);
    };
  }, [
    token.layout?.header?.heightLayoutHeader,
    needFixedHeader,
    isFixedHeaderScroll,
  ]);

  const isTop = layout === 'top';

  const baseClassName = `${prefixCls}-layout-header`;
  const { wrapSSR, hashId } = useStyle(baseClassName);

  const stylish = useStylish(`${baseClassName}.${baseClassName}-stylish`, {
    proLayoutCollapsedWidth: 64,
    stylish: props.stylish,
  });

  const className = clsx(propsClassName, hashId, baseClassName, {
    [`${baseClassName}-fixed-header`]: needFixedHeader,
    [`${baseClassName}-fixed-header-scroll`]: isFixedHeaderScroll,
    [`${baseClassName}-fixed-header-action`]: !collapsed,
    [`${baseClassName}-top-menu`]: isTop,
    [`${baseClassName}-header`]: true,
    [`${baseClassName}-stylish`]: !!props.stylish,
  });

  return stylish.wrapSSR(
    wrapSSR(
      <>
        <ConfigProvider
          theme={{
            hashed: isNeedOpenHash(),
            components: {
              Layout: {
                headerBg: 'transparent',
                bodyBg: 'transparent',
              },
            },
          }}
        >
          {needFixedHeader && (
            <Header
              style={{
                height: token.layout?.header?.heightLayoutHeader || 56,
                lineHeight: `${
                  token.layout?.header?.heightLayoutHeader || 56
                }px`,
                backgroundColor: 'transparent',
                zIndex: 19,
                ...style,
              }}
            />
          )}
          <Header
            className={className}
            style={style}
            data-testid="pro-layout-header"
          >
            {renderContent()}
          </Header>
        </ConfigProvider>
      </>,
    ),
  );
};

export { DefaultHeader };
