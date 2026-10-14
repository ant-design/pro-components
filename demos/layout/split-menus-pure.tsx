import { PageContainer, ProLayout } from '@ant-design/pro-components';
import defaultProps from './_defaultProps';

export default () => (
  <div style={{ height: 520, overflow: 'auto' }}>
    <ProLayout
      {...defaultProps}
      layout="mix"
      splitMenus
      pure
      location={{ pathname: '/admin/sub-page1' }}
    >
      <PageContainer>纯净模式只保留页面内容。</PageContainer>
    </ProLayout>
  </div>
);
