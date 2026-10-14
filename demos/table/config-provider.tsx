import { ProTable } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';

type Task = { id: number; title: string };

export default () => (
  <ConfigProvider prefixCls="demo-table">
    <ProTable<Task>
      rowKey="id"
      columns={[{ title: '任务名称', dataIndex: 'title' }]}
      dataSource={[
        { id: 1, title: '优化首页加载速度' },
        { id: 2, title: '修复登录超时问题' },
      ]}
      search={false}
      pagination={false}
      options={false}
    />
  </ConfigProvider>
);
