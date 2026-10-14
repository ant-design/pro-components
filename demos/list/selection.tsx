import { ProList } from '@ant-design/pro-components';
import type { Key } from 'react';
import { useState } from 'react';

type Project = { id: number; title: string };
const projects: Project[] = [
  { id: 1, title: '智慧零售平台' },
  { id: 2, title: '数据可视化引擎' },
  { id: 3, title: '流程中心' },
];

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  return (
    <>
      <div style={{ marginBottom: 12 }}>已选择 {selectedRowKeys.length} 项</div>
      <ProList<Project>
        rowKey="id"
        dataSource={projects}
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
        columns={[{ dataIndex: 'title', listSlot: 'title' }]}
      />
    </>
  );
};
