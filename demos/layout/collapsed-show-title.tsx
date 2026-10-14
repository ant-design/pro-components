import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';

export default () => (
  <div style={{ height: 540, overflow: 'auto' }}>
    <ProLayout
      title="折叠菜单标题"
      collapsed
      collapsedButtonRender={false}
      menu={{ collapsedShowTitle: true, collapsedWidth: 96 }}
      route={{
        routes: [
          { path: '/dashboard', name: '工作台', icon: <HomeOutlined /> },
          { path: '/settings', name: '设置', icon: <SettingOutlined /> },
        ],
      }}
      location={{ pathname: '/dashboard' }}
    >
      <div style={{ minHeight: 360, padding: 24 }}>
        <h2>menu.collapsedShowTitle</h2>
        <p>侧边栏折叠时仍显示菜单标题。</p>
      </div>
    </ProLayout>
  </div>
);
