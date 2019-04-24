import { ConnectProps, ConnectState } from '../models/connect';
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

export interface BasicLayoutWrapperProps
  extends ConnectProps,
    BasicLayoutProps {
  settings: Settings;
}

const BasicLayoutWrapper: React.FC<BasicLayoutWrapperProps> = props => {
  const { dispatch, route, children } = props;
  const { routes, authority } = route!;
  /**
   * constructor
   */
  useState(() => {
    dispatch!({ type: 'user/fetchCurrent' });
    dispatch!({ type: 'setting/getSetting' });
    dispatch!({ type: 'menu/getMenuData', payload: { routes, authority } });
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
        onLayoutCollapsedChange={payload =>
          dispatch!({ type: 'global/changeLayoutCollapsed', payload })
        }
        renderRightContent={rightProps => <RightContent {...rightProps} />}
      >
        {children}
      </BasicLayout>
      <SettingDrawer {...props} onSettingChange={onSettingChange} />
    </>
  );
};

export default connect(
  ({ global, setting, menu: menuModel }: ConnectState) => ({
    collapsed: global.collapsed,
    menuData: menuModel.menuData,
    breadcrumbNameMap: menuModel.breadcrumbNameMap,
    settings: setting,
  }),
)(BasicLayoutWrapper);
