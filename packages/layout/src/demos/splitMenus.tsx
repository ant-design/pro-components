import React from 'react';
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import defaultProps from './fixtures/defaultProps';

export default () => {
  return (
    <>
      <ProLayout
        {...defaultProps}
        layout="mix"
        splitMenus
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
        splitMenus
        breadcrumbList={[]}
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
        location={{
          pathname: '/welcome',
        }}
        openKeys={false}
        style={{
          height: 500,
        }}
      />
      <SettingDrawer collapse />
    </>
  );
};
