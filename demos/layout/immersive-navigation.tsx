import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

const projectRoute = {
  routes: [
    { path: '/projects/overview', name: '项目概览' },
    { path: '/projects/tasks', name: '项目任务' },
  ],
};
const listRoute = { routes: [{ path: '/projects', name: '项目列表' }] };

export default () => {
  const [pathname, setPathname] = useState('/projects/overview');
  const inProject = pathname !== '/projects';

  return (
    <div style={{ height: 560, overflow: 'auto' }}>
      <ProLayout
        key={inProject ? 'project' : 'list'}
        title="项目导航"
        route={inProject ? projectRoute : listRoute}
        location={{ pathname }}
        menuHeaderRender={() =>
          inProject ? (
            <Button type="link" onClick={() => setPathname('/projects')}>
              ← 返回项目列表
            </Button>
          ) : (
            <strong style={{ paddingInline: 16 }}>项目列表</strong>
          )
        }
        menuItemRender={(item, dom) => (
          <a
            href={item.path}
            onClick={(event) => {
              event.preventDefault();
              setPathname(item.path || '/projects');
            }}
          >
            {dom}
          </a>
        )}
      >
        <PageContainer title={inProject ? '示例项目' : '项目列表'}>
          <div style={{ minHeight: 280, padding: 24, background: '#fff' }}>
            <p role="status">当前路径：{pathname}</p>
            <Button
              onClick={() =>
                setPathname(inProject ? '/projects' : '/projects/overview')
              }
            >
              {inProject ? '返回项目列表' : '进入示例项目'}
            </Button>
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
