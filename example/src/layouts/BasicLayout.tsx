import { ConnectProps, ConnectState, MenuDataItem } from '../models/connect';
import BasicLayout, {
  BasicLayoutProps,
  SettingDrawer,
  Settings,
} from '../../../src';
import RightContent from '../components/GlobalHeader/RightContent';
import { connect } from 'dva';
import React, { useState } from 'react';
import router from 'umi/router';
import logo from '../assets/logo.svg';
import Authorized from '@/utils/Authorized';
import Link from 'umi/link';

export interface BasicLayoutWrapperProps
  extends ConnectProps,
    BasicLayoutProps {
  settings: Settings;
}

const BasicLayoutWrapper: React.FC<BasicLayoutWrapperProps> = props => {
  const { dispatch, children } = props;
  /**
   * constructor
   */
  useState(() => {
    dispatch!({ type: 'user/fetchCurrent' });
    dispatch!({ type: 'setting/getSetting' });
  });

  const onSettingChange = (settings: Partial<Settings>) => {
    dispatch!({
      type: 'setting/changeSetting',
      payload: settings,
    });
  };
  return (
    <>
      <BasicLayout
        logo={() => <img src={logo} onClick={() => router.push('/')} />}
        {...props}
        {...props.settings}
        onCollapse={payload => {
          dispatch!({ type: 'global/changeLayoutCollapsed', payload });
        }}
        menuDataRender={menuList => {
          return menuList.map(item => {
            return Authorized.check(item.authority, item, null) as MenuDataItem;
          });
        }}
        itemRender={route => {
          return <Link to={route.path}>{route.breadcrumbName}</Link>;
        }}
        menuItemRender={(props, defaultDom) => (
          <Link to={props.path}>{defaultDom}</Link>
        )}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
      >
        {children}
      </BasicLayout>
      <SettingDrawer {...props} onSettingChange={onSettingChange} />
    </>
  );
};

export default connect(({ global, setting }: ConnectState) => ({
  collapsed: global.collapsed,
  settings: setting,
}))(BasicLayoutWrapper);
