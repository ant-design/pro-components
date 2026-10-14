import { ProTable } from '@ant-design/pro-components';
import { useCallback, useState } from 'react';

type Task = { id: number; title: string };

export default () => {
  const [loads, setLoads] = useState(0);
  const request = useCallback(async () => {
    setLoads((count) => count + 1);
    return {
      data: [{ id: 1, title: '点击右上角刷新按钮重新加载' }],
      total: 1,
      success: true,
    };
  }, []);

  return (
    <ProTable<Task>
      rowKey="id"
      headerTitle={`无查询表单，已加载 ${loads} 次`}
      search={false}
      options={{ reload: true, setting: false, density: false }}
      pagination={false}
      columns={[{ title: '任务', dataIndex: 'title' }]}
      request={request}
    />
  );
};
