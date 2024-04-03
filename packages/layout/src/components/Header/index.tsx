import { isNeedOpenHash, ProProvider } from '@ant-design/pro-provider';
import { ConfigProvider, Layout } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useContext, useEffect, useState } from 'react';
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
  } = props;
  const { token } = useContext(ProProvider);
  const context = useContext(ConfigProvider.ConfigContext);
  const [isFixedHeaderScroll, setIsFixedHeaderScroll] = useState(false);
  const needFixedHeader = fixedHeader || layout === 'mix';

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
    const dom = context?.getTargetContainer?.() || document.body;

    const isFixedHeaderFn = () => {
      const scrollTop = dom.scrollTop;

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

  const className = classNames(propsClassName, hashId, baseClassName, {
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
          // @ts-ignore
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
          <Header className={className} style={style}>
            {renderContent()}
          </Header>
        </ConfigProvider>
      </>,
    ),
  );
};

export { DefaultHeader };
