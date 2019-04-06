import SiderMenu from './SiderMenu';
import { MenuDataItem, Route } from './typings';
import { SiderMenuProps } from './SiderMenu/SiderMenu';
import { BaseMenuProps } from './SiderMenu/BaseMenu';
import Header, { HeaderViewProps } from './Header';
import getPageTitle from './getPageTitle';
import { Layout } from 'antd';
import classNames from 'classnames';
import React, { Suspense, useState } from 'react';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import useMedia from 'react-media-hook2';
import styles from './BasicLayout.less';
import PageHeaderWrapper from './PageHeaderWrapper';
import { Settings } from './defaultSettings';
import { RouterTypes } from 'umi';
import Footer from './Footer';
import SettingDrawer, { SettingDrawerProps } from './SettingDrawer';

// lazy load SettingDrawer
const LazySettingDrawer: React.LazyExoticComponent<typeof SettingDrawer> = React.lazy(() =>
  import('./SettingDrawer'),
);

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

export interface BasicLayoutProps
  extends Partial<RouterTypes<Route>>,
    SiderMenuProps,
    HeaderViewProps {
  settings: Settings;
  logo: string;
  onChangeLayoutCollapsed: (collapsed: boolean) => void;
  renderSettingDrawer?: (props: HeaderViewProps) => React.ReactNode;
  onChangeSetting: SettingDrawerProps['onChangeSetting'];
  renderHeader?: (props: HeaderViewProps) => React.ReactNode;
  renderFooter?: (props: HeaderViewProps) => React.ReactNode;
  renderMenu?: (props: HeaderViewProps) => React.ReactNode;
  renderMenuItem?: BaseMenuProps['renderMenuItem'];
  breadcrumbNameMap?: { [path: string]: MenuDataItem };
}

const renderSettingDrawer = (props: BasicLayoutProps) => {
  const { onChangeSetting } = props;
  if (props.renderSettingDrawer) {
    return props.renderSettingDrawer(props);
  }
  return <LazySettingDrawer {...props} onChangeSetting={onChangeSetting} />;
};

const renderHeader = (props: BasicLayoutProps) => {
  if (props.renderHeader) {
    return props.renderHeader({ ...props });
  }
  return <Header {...props} />;
};

const renderFooter = (props: BasicLayoutProps) => {
  if (props.renderFooter) {
    return props.renderFooter({ ...props });
  }
  return <Footer />;
};

const renderSiderMenu = (props: BasicLayoutProps) => {
  const {
    settings: { layout },
    isMobile,
    renderMenu,
  } = props;
  if (layout === 'topmenu' && !isMobile) {
    return null;
  }
  if (renderMenu) {
    return renderMenu(props);
  }
  return <SiderMenu {...props} />;
};

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    breadcrumbNameMap = {},
    children,
    onChangeLayoutCollapsed,
    settings,
    fixSiderbar,
    location,
    menuData,
  } = props;
  const { fixedHeader, layout: PropsLayout } = settings;
  /**
   * init variables
   */
  const isMobile = useMedia({ id: 'BasicLayout', query: '(max-width: 599px)' })[0];

  const hasLeftPadding = fixSiderbar && PropsLayout !== 'topmenu' && !isMobile;

  const [collapsed, setCollapsed] = useState(false);
  const handleMenuCollapse = (payload: boolean) => {
    if (onChangeLayoutCollapsed && props.collapsed !== undefined) {
      return onChangeLayoutCollapsed(payload);
    }
    return setCollapsed(payload);
  };

  const layout = (
    <Layout>
      {renderSiderMenu({
        menuData,
        handleMenuCollapse,
        isMobile,
        theme: settings.navTheme,
        collapsed,
        ...props,
      })}
      <Layout
        style={{
          paddingLeft: hasLeftPadding ? (collapsed ? 80 : 256) : void 0,
          minHeight: '100vh',
        }}
      >
        {renderHeader({
          menuData,
          handleMenuCollapse,
          isMobile,
          collapsed,
          ...props,
        })}
        <Content className={styles.content} style={!fixedHeader ? { paddingTop: 0 } : {}}>
          <PageHeaderWrapper location={location} breadcrumbNameMap={breadcrumbNameMap}>
            {children}
          </PageHeaderWrapper>
        </Content>
        {renderFooter({
          isMobile,
          collapsed,
          ...props,
        })}
      </Layout>
    </Layout>
  );
  return (
    <React.Fragment>
      <DocumentTitle title={getPageTitle(location!.pathname, breadcrumbNameMap, settings)}>
        <ContainerQuery query={query}>
          {params => (
            <div className={classNames(params, 'ant-design-pro', 'basicLayout')}>{layout}</div>
          )}
        </ContainerQuery>
      </DocumentTitle>
      <Suspense fallback={null}>{renderSettingDrawer(props)}</Suspense>
    </React.Fragment>
  );
};

export default BasicLayout;
