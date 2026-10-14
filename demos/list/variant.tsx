import { ProList } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import { useState } from 'react';

type Project = { id: number; title: string };
const projects: Project[] = [
  { id: 1, title: '智慧零售平台' },
  { id: 2, title: '数据可视化引擎' },
];

export default () => {
  const [variant, setVariant] = useState<'outlined' | 'filled' | 'borderless'>(
    'outlined',
  );

  return (
    <>
      <Segmented
        value={variant}
        onChange={(value) => setVariant(value as typeof variant)}
        options={[
          { label: '线框', value: 'outlined' },
          { label: '填充', value: 'filled' },
          { label: '无边框', value: 'borderless' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <ProList<Project>
        rowKey="id"
        variant={variant}
        dataSource={projects}
        columns={[{ dataIndex: 'title', listSlot: 'title' }]}
      />
    </>
  );
};
