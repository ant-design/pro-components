import { PageContainer, ProLayout } from '@ant-design/pro-components';
import defaultProps from './_defaultProps';
import { demoOnMenuHeaderClick } from './_demoHandlers';

const Demo = () => {
  return (
    <>
      <ProLayout {...defaultProps} layout="mix" splitMenus pure>
        <PageContainer>splitMenus + pure</PageContainer>
      </ProLayout>
      <ProLayout {...defaultProps} layout="mix" splitMenus>
        <PageContainer>splitMenus</PageContainer>
      </ProLayout>
      <ProLayout
        {...defaultProps}
        breadcrumbRender={false}
        layout="mix"
        splitMenus
        headerRender={false}
        onMenuHeaderClick={demoOnMenuHeaderClick}
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
        collapsed
        contentWidth="Fixed"
        menuExtraRender={false}
        menuHeaderRender={false}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
        }}
        location={{
          pathname: '/welcome',
        }}
        style={{
          height: '100vh',
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
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
        }}
        style={{
          height: '100vh',
        }}
      >
        <PageContainer>splitMenus + fixSiderbar</PageContainer>
      </ProLayout>

      <ProLayout
        {...defaultProps}
        layout="mix"
        menuHeaderRender={() => null}
        location={{
          pathname: '/welcome',
        }}
        openKeys={false}
        actionsRender={() => [
          <a key="docs" href="https://procomponents.ant.design/">
            文档
          </a>,
        ]}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
        }}
        style={{
          height: '100vh',
        }}
      >
        <PageContainer>顶部操作区示例</PageContainer>
      </ProLayout>
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
        style={{
          height: '100vh',
        }}
      >
        <PageContainer>splitMenus 关闭时的侧栏与内容</PageContainer>
      </ProLayout>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
