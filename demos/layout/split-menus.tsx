import { PageContainer, ProLayout } from '@ant-design/pro-components';
import defaultProps from './_defaultProps';

export default () => (
  <div style={{ height: 520, overflow: 'auto' }}>
    <ProLayout
      {...defaultProps}
      layout="mix"
      splitMenus
      location={{ pathname: '/admin/sub-page1' }}
    >
      <PageContainer>
        顶部显示一级菜单，侧栏显示当前分组的子菜单。
      </PageContainer>
    </ProLayout>
  </div>
);
