import { ProList } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';

export default () => (
  <ConfigProvider prefixCls="demo-list">
    <ProList<{ id: number; title: string }>
      rowKey="id"
      headerTitle="ConfigProvider.prefixCls"
      columns={[{ dataIndex: 'title', listSlot: 'title' }]}
      dataSource={[{ id: 1, title: '示例任务' }]}
      pagination={false}
    />
  </ConfigProvider>
);
