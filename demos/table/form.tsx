import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

type Task = { id: number; name: string };

const tasks: Task[] = [
  { id: 1, name: '设计首页' },
  { id: 2, name: '开发登录页' },
];
const columns: ProColumns<Task>[] = [{ title: '任务名称', dataIndex: 'name' }];

export default () => {
  const formRef = useRef<ProFormInstance>();

  return (
    <div style={{ padding: 24 }}>
      <ProTable<Task>
        columns={columns}
        rowKey="id"
        formRef={formRef}
        options={false}
        pagination={false}
        headerTitle="formRef.current.setFieldsValue"
        toolBarRender={() => [
          <Button
            key="fill"
            onClick={() => formRef.current?.setFieldsValue({ name: '设计' })}
          >
            填入“设计”
          </Button>,
        ]}
        request={async ({ name }) => {
          const data = tasks.filter((task) =>
            task.name.includes(String(name || '')),
          );
          return { data, total: data.length, success: true };
        }}
      />
    </div>
  );
};
