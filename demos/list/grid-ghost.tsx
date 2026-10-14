import { ProList } from '@ant-design/pro-components';
import { gridColumns, gridData } from './_gridData';

export default () => (
  <div style={{ padding: 12, background: '#f5f5f5' }}>
    <ProList
      rowKey="id"
      dataSource={gridData}
      columns={gridColumns}
      grid={{ xs: 1, sm: 2 }}
      ghost
      pagination={false}
    />
  </div>
);
