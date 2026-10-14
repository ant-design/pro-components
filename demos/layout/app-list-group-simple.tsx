import { CalendarOutlined, FileTextOutlined } from '@ant-design/icons';
import type { AppItemProps } from '@ant-design/pro-components';
import { ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';

const appList: AppItemProps[] = [
  {
    title: '个人工具',
    children: [
      { title: '日历', icon: <CalendarOutlined /> },
      { title: '笔记', icon: <FileTextOutlined /> },
    ],
  },
];

export default () => {
  const [selected, setSelected] = useState('尚未选择');

  return (
    <div style={{ height: 560, overflow: 'auto' }}>
      <ProLayout
        title="精简应用列表"
        route={{ routes: [{ path: '/demo', name: '示例页' }] }}
        location={{ pathname: '/demo' }}
        appList={appList}
        itemClick={(item, popoverRef) => {
          setSelected(typeof item.title === 'string' ? item.title : '应用');
          popoverRef?.current?.click();
        }}
      >
        <div style={{ minHeight: 360, padding: 24 }}>
          <h2>appList 精简分组</h2>
          <p>桌面宽度下，点击左上角入口查看精简应用列表。</p>
          <p role="status">当前应用：{selected}</p>
        </div>
      </ProLayout>
    </div>
  );
};
