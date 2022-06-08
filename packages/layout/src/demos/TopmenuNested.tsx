import { PageContainer, ProLayout } from '@ant-design/pro-components';
import complexMenu from './complexMenu';

export default () => (
  <div
    style={{
      height: '100vh',
      overflow: 'auto',
    }}
  >
    <ProLayout
      location={{
        pathname: '/articles/new',
      }}
      route={{
        routes: complexMenu,
      }}
      disableContentMargin
      layout="top"
    >
      <ProLayout
        location={{
          pathname: '/home/overview',
        }}
        route={{
          routes: complexMenu,
        }}
        navTheme="light"
        menuHeaderRender={false}
      >
        <PageContainer content="欢迎使用">
          <div>Hello World</div>
        </PageContainer>
      </ProLayout>
    </ProLayout>
  </div>
);
