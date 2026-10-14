import { FolderOutlined, StarFilled } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';

const routes = [
  { path: '/favorites', name: '收藏', icon: <StarFilled /> },
  { path: '/projects', name: '项目', icon: <FolderOutlined /> },
];

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout location={{ pathname: '/favorites' }} route={{ routes }}>
      <PageContainer title="React 图标节点">
        菜单的 icon 属性直接接收 React 图标节点。
      </PageContainer>
    </ProLayout>
  </div>
);
