import { ProLayout } from '@ant-design/pro-components';
import { Input } from 'antd';
import { useState } from 'react';

const route = {
  path: '/',
  routes: [
    { path: '/projects', name: '项目列表' },
    { path: '/team', name: '团队成员' },
    { path: '/reports', name: '项目报表' },
    { path: '/settings', name: '系统设置' },
  ],
};

export default () => {
  const [keyword, setKeyword] = useState('');

  return (
    <div style={{ height: 560, overflow: 'auto' }}>
      <ProLayout
        title="搜索菜单"
        route={route}
        location={{ pathname: '/projects' }}
        menuExtraRender={(props) =>
          props?.collapsed ? null : (
            <div style={{ padding: 12 }}>
              <Input
                aria-label="搜索菜单"
                placeholder="输入菜单名称"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </div>
          )
        }
        postMenuData={(menus) =>
          (menus || []).filter((item) => item.name?.includes(keyword))
        }
      >
        <div style={{ padding: 24 }}>
          {keyword ? `当前搜索：${keyword}` : '在侧栏搜索菜单名称'}
        </div>
      </ProLayout>
    </div>
  );
};
