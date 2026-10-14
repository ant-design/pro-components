import { PageContainer, ProLayout } from '@ant-design/pro-components';

const routes = [
  { path: '/favorites', name: '收藏', icon: 'icon-demo-star' },
  { path: '/projects', name: '项目', icon: 'icon-demo-folder' },
  { path: '/reports', name: '报表', icon: 'icon-demo-chart' },
];

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout
      location={{ pathname: '/favorites' }}
      iconfontUrl="/demo-iconfont.js"
      route={{ routes }}
    >
      <PageContainer title="IconFont 菜单">
        菜单图标由 iconfontUrl 加载的本地图标脚本提供。
      </PageContainer>
    </ProLayout>
  </div>
);
