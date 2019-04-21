import SiderMenu from './SiderMenu';
import { MenuDataItem, Route, WithFalse } from './typings';
import { SiderMenuProps } from './SiderMenu/SiderMenu';
import { BaseMenuProps } from './SiderMenu/BaseMenu';
import Header, { HeaderViewProps } from './Header';
import getPageTitle from './getPageTitle';
import { Layout } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import useMedia from 'react-media-hook2';
import defaultSettings, { Settings } from './defaultSettings';
import { RouterTypes } from 'umi';
import Footer from './Footer';
import SettingDrawer, { SettingDrawerProps } from './SettingDrawer';
import getLocales, { langType } from './locales';
import RouteContext from './RouteContext';
import { conversionBreadcrumbList } from './PageHeaderWrapper/Breadcrumb';

import './BasicLayout.less';

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
  renderLogo?: WithFalse<(logo: React.ReactNode) => React.ReactNode>;
  lang?: langType;
  onChangeLayoutCollapsed?: (collapsed: boolean) => void;
  renderSettingDrawer?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  renderHeader?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  renderFooter?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  renderMenu?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  renderMenuItem?: BaseMenuProps['renderMenuItem'];
  breadcrumbNameMap?: { [path: string]: MenuDataItem };
  onChangeSetting?: SettingDrawerProps['onChangeSetting'];
  formatMessage?: SettingDrawerProps['formatMessage'];
}

const getSetting = (settings: Settings) => {
  return { ...defaultSettings, ...settings };
};

const renderSettingDrawer = (
  props: BasicLayoutProps & {
    formatMessage: SettingDrawerProps['formatMessage'];
  },
) => {
  if (props.renderSettingDrawer === false) {
    return null;
  }
  const { onChangeSetting } = props;
  if (props.renderSettingDrawer && onChangeSetting) {
    return props.renderSettingDrawer(props);
  }
  return <SettingDrawer {...props} onChangeSetting={onChangeSetting} />;
};

const renderHeader = (props: BasicLayoutProps) => {
  if (props.renderHeader === false) {
    return null;
  }
  if (props.renderHeader) {
    return props.renderHeader({ ...props });
  }
  return <Header {...props} />;
};

const renderFooter = (props: BasicLayoutProps) => {
  if (props.renderFooter === false) {
    return null;
  }
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
  if (props.renderMenu === false) {
    return null;
  }
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
  const { children, onChangeLayoutCollapsed, location, menuData } = props;
  // merge props.settings and defaultSettings
  const settings = getSetting(props.settings);

  const { fixedHeader, fixSiderbar, layout: PropsLayout } = settings;
  /**
   * init variables
   */
  const isMobile = useMedia({
    id: 'BasicLayout',
    query: '(max-width: 599px)',
  })[0];

  const hasLeftPadding = fixSiderbar && PropsLayout !== 'topmenu' && !isMobile;

  const [collapsed, setCollapsed] = useState(false);
  const handleMenuCollapse = (payload: boolean) => {
    if (onChangeLayoutCollapsed && props.collapsed !== undefined) {
      return onChangeLayoutCollapsed(payload);
    }
    return setCollapsed(payload);
  };

  const formatMessage = ({
    id,
    defaultMessage,
    ...rest
  }: {
    id: string;
    defaultMessage?: string;
  }) => {
    if (props.formatMessage) {
      props.formatMessage({
        id,
        defaultMessage,
        ...rest,
      });
    }
    const locales = getLocales();
    if (locales[id]) {
      return locales[id];
    }
    if (defaultMessage) {
      return defaultMessage as string;
    }
    return id;
  };

  const defaultProps = {
    ...props,
    formatMessage,
  };
  const breadcrumb = conversionBreadcrumbList({
    ...props,
  });
  const layout = (
    <Layout>
      {renderSiderMenu({
        menuData,
        handleMenuCollapse,
        isMobile,
        theme: settings.navTheme,
        collapsed,
        ...defaultProps,
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
          ...defaultProps,
        })}
        <Content
          className="ant-pro-basicLayout-content"
          style={!fixedHeader ? { paddingTop: 0 } : {}}
        >
          <RouteContext.Provider
            value={{
              ...breadcrumb,
              settings,
            }}
          >
            {children}
          </RouteContext.Provider>
        </Content>
        {renderFooter({
          isMobile,
          collapsed,
          ...defaultProps,
        })}
      </Layout>
    </Layout>
  );
  return (
    <>
      <DocumentTitle
        title={getPageTitle({ pathname: location!.pathname, ...defaultProps })}
      >
        <ContainerQuery query={query}>
          {params => (
            <div
              className={classNames(params, 'ant-design-pro', 'basicLayout')}
            >
              {layout}
            </div>
          )}
        </ContainerQuery>
      </DocumentTitle>
      {renderSettingDrawer(defaultProps)}
    </>
  );
};

BasicLayout.defaultProps = {
  logo: '',
  settings: defaultSettings,
  onLogoClick: () => window.history.pushState({}, '', '/'),
};
export default BasicLayout;
