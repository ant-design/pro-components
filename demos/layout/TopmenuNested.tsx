import { PageContainer, ProLayout } from '@ant-design/pro-components';
import complexMenu from './complexMenu';

const Demo = () => (
  <div
    style={{
      height: '100vh',
      overflow: 'auto',
    }}
  >
    <ProLayout
      location={{
        pathname: '/product/list/on-sale',
      }}
      route={{
        routes: complexMenu,
      }}
      layout="top"
    >
      <ProLayout
        location={{
          pathname: '/dashboard/overview',
        }}
        route={{
          routes: complexMenu,
        }}
        menuHeaderRender={false}
      >
        <PageContainer content="欢迎使用">
          <div>Hello World</div>
        </PageContainer>
      </ProLayout>
    </ProLayout>
  </div>
);

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
