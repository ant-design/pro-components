import { PageContainer, ProLayout } from '@ant-design/pro-components';
import defaultProps from './_defaultProps';

export default () => (
  <ProLayout
    {...defaultProps}
    style={{
      height: '100vh',
    }}
    location={{
      pathname: '/welcome',
    }}
    menuRender={(props, dom) => (
      <div
        style={{
          background: '#fff',
          boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)',
          overflow: 'hidden',
          height: '100%',
          width: props.collapsed ? 0 : props.siderWidth || 256,
        }}
      >
        {dom}
      </div>
    )}
  >
    <PageContainer content="欢迎使用">Hello World</PageContainer>
  </ProLayout>
);
