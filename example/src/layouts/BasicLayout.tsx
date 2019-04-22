import {
  ConnectProps,
  ConnectState,
  SettingModelState,
} from '../models/connect';
import BasicLayout, { BasicLayoutProps } from '../../../src/BasicLayout';
import RightContent from '../components/GlobalHeader/RightContent';
import { connect } from 'dva';
import React, { useState } from 'react';
import router from 'umi/router';
import logo from '../assets/logo.svg';

export interface BasicLayoutWrapperProps
  extends ConnectProps,
    BasicLayoutProps {
  settings: SettingModelState;
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

  const onSettingChange: BasicLayoutProps['onSettingChange'] = settings => {
    dispatch!({
      type: 'setting/changeSetting',
      payload: settings,
    });
  };

  return (
    <BasicLayout
      logo={() => <img src={logo} onClick={() => router.push('/')} />}
      {...props}
      onLayoutCollapsedChange={payload =>
        dispatch!({ type: 'global/changeLayoutCollapsed', payload })
      }
      renderFooter={false}
      onSettingChange={onSettingChange}
      renderRightContent={rightProps => <RightContent {...rightProps} />}
    >
      {children}
    </BasicLayout>
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
