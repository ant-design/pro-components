import { ProList } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

type Task = { id: number; title: string; type?: 'new' };

export default () => {
  const [tasks, setTasks] = useState<Task[]>([{ id: 1, title: '已有任务' }]);

  return (
    <ProList<Task>
      rowKey="id"
      headerTitle="新增动画：type=new"
      columns={[
        { dataIndex: 'title', listSlot: 'title' },
        { dataIndex: 'type', listSlot: 'type' },
      ]}
      dataSource={tasks}
      pagination={false}
      toolBarRender={() => [
        <Button
          key="add"
          onClick={() => {
            const id = Date.now();
            setTasks((current) => [
              ...current.map(({ type: _type, ...task }) => task),
              { id, title: `新任务 ${current.length}`, type: 'new' },
            ]);
          }}
        >
          添加新任务
        </Button>,
      ]}
    />
  );
};
