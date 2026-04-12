import { ConfigProvider, Layout } from 'antd';
import { clsx } from 'clsx';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
    hasSiderMenu,
    siderWidth,
  } = props;
  const { token } = useContext(ProProvider);
  const context = useContext(ConfigProvider.ConfigContext);
  const [isFixedHeaderScroll, setIsFixedHeaderScroll] = useState(false);
  const needFixedHeader = fixedHeader || layout === 'mix';

  /** mix + fixed：顶栏 `position:fixed` 相对视口全宽会盖住侧栏，需与主内容区对齐 */
  const fixedHeaderMixStyle = useMemo(() => {
    if (!needFixedHeader || layout !== 'mix' || isMobile || !hasSiderMenu) {
      return undefined;
    }
    const w =
      typeof siderWidth === 'number'
        ? siderWidth
        : Number.parseInt(String(siderWidth ?? ''), 10);
    if (!Number.isFinite(w) || w <= 0) {
      return undefined;
    }
    return {
      insetInlineStart: w,
      width: `calc(100% - ${w}px)`,
    } as const;
  }, [needFixedHeader, layout, isMobile, hasSiderMenu, siderWidth]);

  const renderContent = useCallback(() => {
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
  }, [headerContentRender, headerRender, isMobile, layout, onCollapse, props]);
  useEffect(() => {
    if (!needFixedHeader) return;
    if (typeof window === 'undefined') return;

    const dom = context?.getTargetContainer?.() || document.body;
    const threshold = token.layout?.header?.heightLayoutHeader || 56;

    const handleScroll = () => {
      const scrollTop = (dom as HTMLElement).scrollTop;
      setIsFixedHeaderScroll(scrollTop > threshold);
    };

    handleScroll();
    dom.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      dom.removeEventListener('scroll', handleScroll);
    };
  }, [context, needFixedHeader, token.layout?.header?.heightLayoutHeader]);

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
    [`${baseClassName}-mix`]: layout === 'mix',
    [`${baseClassName}-fixed-header-action`]: !collapsed,
    [`${baseClassName}-top-menu`]: isTop,
    [`${baseClassName}-header`]: true,
    [`${baseClassName}-stylish`]: !!props.stylish,
  });

  if (layout === 'side' && !isMobile) return null;
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
                ...fixedHeaderMixStyle,
              }}
            />
          )}
          <Header
            className={className}
            style={{ ...style, ...fixedHeaderMixStyle }}
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
