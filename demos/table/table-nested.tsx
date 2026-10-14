import { ProTable } from '@ant-design/pro-components';

type App = { id: number; name: string };
type Change = { id: number; time: string; detail: string };

const apps: App[] = [
  { id: 1, name: '认证服务' },
  { id: 2, name: '报表服务' },
];

export default () => (
  <ProTable<App>
    rowKey="id"
    headerTitle="展开查看变更记录"
    columns={[{ title: '应用', dataIndex: 'name' }]}
    dataSource={apps}
    search={false}
    pagination={false}
    expandable={{
      expandedRowRender: (app) => (
        <ProTable<Change>
          rowKey="id"
          columns={[
            { title: '时间', dataIndex: 'time' },
            { title: '变更', dataIndex: 'detail' },
          ]}
          dataSource={[
            { id: 1, time: '10:00', detail: `${app.name} 发布新版本` },
            { id: 2, time: '11:30', detail: `${app.name} 完成检查` },
          ]}
          search={false}
          options={false}
          pagination={false}
        />
      ),
    }}
  />
);
