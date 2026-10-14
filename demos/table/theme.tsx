import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { ConfigProvider, theme } from 'antd';

const dataSource = [
  { id: 1, name: '订单 A', owner: '张三', status: '处理中' },
  { id: 2, name: '订单 B', owner: '李四', status: '已完成' },
];

const columns: ProColumns<(typeof dataSource)[number]>[] = [
  { title: '订单', dataIndex: 'name' },
  { title: '负责人', dataIndex: 'owner' },
  { title: '状态', dataIndex: 'status' },
];

export default () => (
  <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
    <div style={{ padding: 16, background: '#141414' }}>
      <ProTable
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        search={false}
        options={false}
        pagination={false}
        scroll={{ x: 480 }}
      />
    </div>
  </ConfigProvider>
);
