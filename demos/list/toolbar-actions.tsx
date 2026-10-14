import { ProList } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

type Task = { id: number; title: string };

export default () => {
  const [tasks, setTasks] = useState<Task[]>([{ id: 1, title: '检查首页' }]);

  return (
    <ProList<Task>
      rowKey="id"
      columns={[{ title: '任务', dataIndex: 'title', listSlot: 'title' }]}
      dataSource={tasks}
      pagination={false}
      toolbar={{
        actions: [
          <Button
            key="add"
            type="primary"
            onClick={() =>
              setTasks((current) => [
                ...current,
                { id: current.length + 1, title: `新任务 ${current.length + 1}` },
              ])
            }
          >
            新建任务
          </Button>,
        ],
      }}
    />
  );
};
