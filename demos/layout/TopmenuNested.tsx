import { PageContainer, ProLayout } from '@xxlabs/pro-components';
import complexMenu from './complexMenu';

export default () => (
  <div
    style={{
      height: '100vh',
      overflow: 'auto',
    }}
  >
    <ProLayout
      layout="top"
      location={{
        pathname: '/articles/new',
      }}
      route={{
        routes: complexMenu,
      }}
    >
      <ProLayout
        location={{
          pathname: '/home/overview',
        }}
        menuHeaderRender={false}
        route={{
          routes: complexMenu,
        }}
      >
        <PageContainer content="欢迎使用">
          <div>Hello World</div>
        </PageContainer>
      </ProLayout>
    </ProLayout>
  </div>
);
