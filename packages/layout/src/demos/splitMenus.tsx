import React from 'react';
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';

export default () => {
  return (
    <>
      <ProLayout
        {...defaultProps}
        layout="mix"
        splitMenus
        headerRender={false}
        onMenuHeaderClick={() => {}}
        formatMessage={({ id }) => id}
        style={{
          height: 500,
        }}
      />
      <ProLayout
        {...defaultProps}
        layout="mix"
        menuExtraRender={() => 'dom'}
        menuHeaderRender={false}
        headerTheme="light"
        navTheme="light"
        splitMenus
        location={{
          pathname: '/welcome',
        }}
        style={{
          height: 500,
        }}
      />

      <ProLayout
        {...defaultProps}
        layout="mix"
        menuHeaderRender={() => null}
        splitMenus
        fixSiderbar
        location={{
          pathname: '/welcome',
        }}
        contentWidth="Fixed"
        openKeys={false}
        style={{
          height: 500,
        }}
      />
      <SettingDrawer collapse />
    </>
  );
};
