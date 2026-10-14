import { ProList } from '@ant-design/pro-components';
import { gridColumns, gridData } from './_gridData';

export default () => (
  <ProList
    rowKey="id"
    dataSource={gridData}
    columns={gridColumns}
    grid={{ xs: 1, sm: 2 }}
    itemCardProps={{ bordered: false }}
    pagination={false}
  />
);
