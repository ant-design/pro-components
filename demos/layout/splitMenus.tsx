import { PageContainer, ProLayout, SettingDrawer } from '@xxlabs/pro-components';
import defaultProps from './_defaultProps';

export default () => {
  return (
    <>
      <ProLayout {...defaultProps} pure splitMenus layout="mix">
        children
      </ProLayout>
      <ProLayout {...defaultProps} splitMenus layout="mix">
        children
      </ProLayout>
      <ProLayout
        {...defaultProps}
        splitMenus
        breadcrumbRender={false}
        formatMessage={({ id }) => id}
        headerRender={false}
        layout="mix"
        style={{
          height: '100vh',
        }}
        onMenuHeaderClick={() => {}}
      />
      <ProLayout
        {...defaultProps}
        splitMenus
        layout="mix"
        location={{
          pathname: '/welcome',
        }}
        menuExtraRender={() => 'dom'}
        menuHeaderRender={() => <div />}
        style={{
          height: '100vh',
        }}
      />

      <ProLayout
        {...defaultProps}
        collapsed
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
        }}
        contentWidth="Fixed"
        layout="top"
        location={{
          pathname: '/welcome',
        }}
        menuExtraRender={false}
        menuHeaderRender={false}
        style={{
          height: '100vh',
        }}
      />
      <ProLayout
        {...defaultProps}
        fixSiderbar
        splitMenus
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
        }}
        contentWidth="Fixed"
        layout="mix"
        location={{
          pathname: '/welcome',
        }}
        menuHeaderRender={() => null}
        openKeys={false}
        style={{
          height: '100vh',
        }}
      >
        xxxx
      </ProLayout>

      <ProLayout
        {...defaultProps}
        actionsRender={() => [<a key="key">key</a>]}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
        }}
        layout="mix"
        location={{
          pathname: '/welcome',
        }}
        menuHeaderRender={() => null}
        openKeys={false}
        style={{
          height: '100vh',
        }}
      >
        xxxx
      </ProLayout>
      <ProLayout
        {...defaultProps}
        fixSiderbar
        contentWidth="Fixed"
        layout="mix"
        location={{
          pathname: '/welcome',
        }}
        menuHeaderRender={() => null}
        openKeys={false}
        splitMenus={false}
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
