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
        formatMessage={({ id }) => id}
        style={{
          height: 500,
        }}
      />
      <ProLayout
        {...defaultProps}
        layout="mix"
        menuHeaderRender={false}
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
