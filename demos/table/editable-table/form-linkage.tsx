import {
  EditableProTable,
  ProForm,
  ProFormDependency,
} from '@ant-design/pro-components';

type Task = { id: number; title: string; hours: number };

const initialTasks: Task[] = [
  { id: 1, title: '设计页面', hours: 3 },
  { id: 2, title: '编写文档', hours: 2 },
];

export default () => (
  <div style={{ maxWidth: '100%', padding: 16 }}>
    <ProForm<{ tasks: Task[] }>
      initialValues={{ tasks: initialTasks }}
      submitter={false}
    >
      <ProFormDependency name={['tasks']}>
        {({ tasks }) => (
          <output>
            合计工时：
            {(tasks || []).reduce(
              (total: number, task: Task) => total + Number(task.hours || 0),
              0,
            )}
            小时
          </output>
        )}
      </ProFormDependency>
      <EditableProTable<Task>
        name="tasks"
        rowKey="id"
        scroll={{ x: 480 }}
        controlled
        recordCreatorProps={false}
        columns={[
          { title: '任务', dataIndex: 'title', editable: false },
          { title: '预计工时', dataIndex: 'hours', valueType: 'digit' },
        ]}
        editable={{ editableKeys: initialTasks.map((task) => task.id) }}
      />
    </ProForm>
  </div>
);
