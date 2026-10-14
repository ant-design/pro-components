import { ProTable } from '@ant-design/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';

type Task = { id: number; title: string };

export default () => {
  const [bordered, setBordered] = useState(false);

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Switch checked={bordered} onChange={setBordered} /> 显示卡片边框
      </div>
      <ProTable<Task>
        rowKey="id"
        cardBordered={bordered}
        columns={[{ title: '任务名称', dataIndex: 'title' }]}
        dataSource={[{ id: 1, title: '优化首页加载速度' }]}
        search={false}
        pagination={false}
        options={false}
      />
    </>
  );
};
