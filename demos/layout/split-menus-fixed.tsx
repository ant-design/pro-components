import { PageContainer, ProLayout } from '@ant-design/pro-components';
import defaultProps from './_defaultProps';

export default () => (
  <div style={{ height: 520, overflow: 'auto' }}>
    <ProLayout
      {...defaultProps}
      layout="mix"
      splitMenus
      fixSiderbar
      location={{ pathname: '/admin/sub-page1' }}
    >
      <PageContainer>
        <div style={{ minHeight: 900 }}>向下滚动内容，观察固定的侧栏。</div>
      </PageContainer>
    </ProLayout>
  </div>
);
