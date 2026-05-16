import { PageContainer, ProLayout } from '@ant-design/pro-components';
import complexMenu from './complex-menu';

const Demo = () => (
  <div
    style={{
      height: '100vh',
    }}
  >
    <ProLayout
      location={{
        pathname: '/product/list/on-sale',
      }}
      route={{
        routes: complexMenu,
      }}
      menu={{ type: 'group' }}
    >
      <PageContainer content="欢迎使用">
        <div>Hello World</div>
      </PageContainer>
    </ProLayout>
  </div>
);

export default () => (
  <div>
    <Demo />
  </div>
);
