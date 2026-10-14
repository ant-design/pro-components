import type { ProColumns } from '@ant-design/pro-components';
import { ProCard, ProList } from '@ant-design/pro-components';

type Item = { id: number; title: string };
const columns: ProColumns<Item>[] = [
  { dataIndex: 'title', title: '标题', listSlot: 'title' },
];
export default () => (
  <ProList<Item>
    rowKey="id"
    columns={columns}
    grid={{ column: 2, gutter: [16, 24] }}
    dataSource={[
      { id: 1, title: '项目 A' },
      { id: 2, title: '项目 B' },
    ]}
    pagination={false}
    itemRender={(_, index, defaultDom) => (
      <ProCard title={`卡片 ${index + 1}`}>{defaultDom}</ProCard>
    )}
  />
);
