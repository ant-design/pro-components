import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useState } from 'react';

const routes = [
  { path: '/dashboard', name: '工作台' },
  { path: '/projects', name: '项目列表' },
];

export default () => {
  const [empty, setEmpty] = useState(false);

  return (
    <div style={{ minHeight: 480 }}>
      <ProLayout
        key={empty ? 'empty-menu' : 'full-menu'}
        location={{ pathname: '/dashboard' }}
        route={{ routes: empty ? [] : routes }}
        suppressSiderWhenMenuEmpty
      >
        <PageContainer title="空菜单时隐藏侧栏">
          <Space wrap>
            <Button onClick={() => setEmpty(false)}>显示菜单</Button>
            <Button onClick={() => setEmpty(true)}>使用空菜单</Button>
          </Space>
          <p>当前菜单：{empty ? '空' : '有内容'}</p>
        </PageContainer>
      </ProLayout>
    </div>
  );
};
