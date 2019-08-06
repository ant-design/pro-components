/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  SettingDrawer,
  PageHeaderWrapper,
} from '../../../src/index';
import React, { useState } from 'react';

import Link from 'umi/link';
import history from 'umi/router';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const [collapsed, handleMenuCollapse] = useState<boolean>(true);
  const [settings, setSettings] = useState<Partial<Settings>>({});
  return (
    <>
      <ProLayout
        logo={logo}
        collapsed={collapsed}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) =>
          menuItemProps.isUrl ? (
            defaultDom
          ) : (
            <Link to={menuItemProps.path}>{defaultDom}</Link>
          )
        }
        rightContentRender={rightProps => (
          <RightContent {...rightProps} {...settings} />
        )}
        onMenuHeaderClick={() => history.push('/')}
        {...props}
        {...settings}
      >
        <PageHeaderWrapper>{props.children}</PageHeaderWrapper>
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={config => setSettings(config)}
      />
    </>
  );
};

export default BasicLayout;
