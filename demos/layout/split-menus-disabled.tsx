import { PageContainer, ProLayout } from '@ant-design/pro-components';
import defaultProps from './_defaultProps';

export default () => (
  <div style={{ height: 520, overflow: 'auto' }}>
    <ProLayout
      {...defaultProps}
      layout="mix"
      splitMenus={false}
      location={{ pathname: '/admin/sub-page1' }}
    >
      <PageContainer>一级与子级菜单保留在同一侧栏。</PageContainer>
    </ProLayout>
  </div>
);
