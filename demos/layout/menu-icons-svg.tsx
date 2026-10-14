import { PageContainer, ProLayout } from '@ant-design/pro-components';

const routes = [
  { path: '/favorites', name: '收藏', icon: '/demo-menu-icon.svg' },
  { path: '/projects', name: '项目' },
];

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout location={{ pathname: '/favorites' }} route={{ routes }}>
      <PageContainer title="SVG 菜单图标">
        收藏图标通过本地 SVG URL 传给路由的 icon 属性。
      </PageContainer>
    </ProLayout>
  </div>
);
