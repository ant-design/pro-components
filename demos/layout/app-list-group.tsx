import { AppstoreOutlined, BookOutlined } from '@ant-design/icons';
import type { AppItemProps } from '@ant-design/pro-components';
import { ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';

const appList: AppItemProps[] = [
  {
    title: '工作应用',
    desc: '日常协作',
    children: [
      { title: '项目管理', desc: '查看项目进度', icon: <AppstoreOutlined /> },
      { title: '知识库', desc: '查找团队文档', icon: <BookOutlined /> },
    ],
  },
];

export default () => {
  const [selected, setSelected] = useState('尚未选择');

  return (
    <div style={{ height: 560, overflow: 'auto' }}>
      <ProLayout
        title="分组应用卡片"
        route={{ routes: [{ path: '/demo', name: '示例页' }] }}
        location={{ pathname: '/demo' }}
        appList={appList}
        itemClick={(item, popoverRef) => {
          setSelected(typeof item.title === 'string' ? item.title : '应用');
          popoverRef?.current?.click();
        }}
      >
        <div style={{ minHeight: 360, padding: 24 }}>
          <h2>appList 分组卡片</h2>
          <p>桌面宽度下，点击布局左上角的应用入口选择应用。</p>
          <p role="status">当前应用：{selected}</p>
        </div>
      </ProLayout>
    </div>
  );
};
