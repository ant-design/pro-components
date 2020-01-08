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
  DefaultFooter,
} from '../../../src/';
import React, { useState } from 'react';
import { Icon } from 'antd';
import defaultSettings from '../../config/defaultSettings';

import Link from 'umi/link';
import history from 'umi/router';
import logo from '../assets/logo.svg';
import SelectLang from '@/components/SelectLang';

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
  const [collapsed, handleMenuCollapse] = useState<boolean>(false);
  const [settings, setSettings] = useState<Partial<Settings>>({
    ...defaultSettings,
    fixSiderbar: true,
    fixedHeader: true,
  });
  return (
    <>
      <ProLayout
        // menuHeaderRender={false}
        logo={logo}
        // siderWidth={200}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        breakpoint={false}
        links={[
          <>
            <Icon type="heart" theme="twoTone" twoToneColor="red" />
            <span>name</span>
          </>,
        ]}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) =>
          menuItemProps.isUrl ? (
            defaultDom
          ) : (
            <Link className="qixian-menuItem" to={menuItemProps.path || '/'}>
              {defaultDom}
            </Link>
          )
        }
        rightContentRender={() => (
          <div
            style={{
              padding: '0 16px',
            }}
          >
            <SelectLang />
          </div>
        )}
        collapsed={collapsed}
        onMenuHeaderClick={() => history.push('/')}
        footerRender={() => <DefaultFooter />}
        {...props}
        {...settings}
      >
        {props.children}
      </ProLayout>
      <SettingDrawer
        // hideLoading
        // hideCopyButton
        // hideHintAlert
        settings={settings}
        onSettingChange={config => setSettings(config)}
      />
    </>
  );
};

export default BasicLayout;
