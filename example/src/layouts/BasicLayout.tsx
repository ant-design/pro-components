import { ConnectProps, ConnectState, SettingModelState } from '@/models/connect';
import BasicLayout, { BasicLayoutProps } from '../../../src/BasicLayout';
import RightContent from '@/components/GlobalHeader/RightContent';
import { connect } from 'dva';
import React, { useState } from 'react';
import logo from '../assets/logo.svg';

export interface BasicLayoutWrapperProps extends ConnectProps, BasicLayoutProps {
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

  const onChangeSetting: BasicLayoutProps['onChangeSetting'] = setttins => {
    dispatch!({
      type: 'setting/changeSetting',
      payload: setttins,
    });
  };

  return (
    <BasicLayout
      logo={logo}
      {...props}
      onChangeLayoutCollapsed={payload =>
        dispatch!({ type: 'global/changeLayoutCollapsed', payload })
      }
      onChangeSetting={onChangeSetting}
      renderRightContent={rightProps => <RightContent {...rightProps} />}
    >
      {children}
    </BasicLayout>
  );
};

export default connect(({ global, setting, menu: menuModel }: ConnectState) => ({
  collapsed: global.collapsed,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  settings: setting,
}))(BasicLayoutWrapper);
