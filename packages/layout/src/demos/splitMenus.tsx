import React from 'react';
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';
import { PageContainer } from '../components/PageContainer';

export default () => {
  return (
    <>
      <ProLayout {...defaultProps} layout="mix" splitMenus pure>
        children
      </ProLayout>
      <ProLayout {...defaultProps} layout="mix" splitMenus>
        children
      </ProLayout>
      <ProLayout
        {...defaultProps}
        breadcrumbRender={false}
        layout="mix"
        splitMenus
        headerRender={false}
        onMenuHeaderClick={() => {}}
        formatMessage={({ id }) => id}
        style={{
          height: '100vh',
        }}
      />
      <ProLayout
        {...defaultProps}
        layout="mix"
        menuExtraRender={() => 'dom'}
        menuHeaderRender={() => <div />}
        headerTheme="light"
        navTheme="light"
        splitMenus
        location={{
          pathname: '/welcome',
        }}
        style={{
          height: '100vh',
        }}
      />

      <ProLayout
        {...defaultProps}
        layout="top"
        contentWidth="Fixed"
        menuExtraRender={false}
        menuHeaderRender={false}
        headerTheme="light"
        navTheme="light"
        location={{
          pathname: '/welcome',
        }}
        rightContentRender={() => 'dom'}
        style={{
          height: '100vh',
        }}
      />

      <ProLayout
        {...defaultProps}
        layout="mix"
        menuHeaderRender={() => null}
        splitMenus={false}
        fixSiderbar
        location={{
          pathname: '/welcome',
        }}
        contentWidth="Fixed"
        openKeys={false}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
        }}
        style={{
          height: '100vh',
        }}
      >
        <PageContainer>xxxx</PageContainer>
      </ProLayout>
      <SettingDrawer collapse />
    </>
  );
};
