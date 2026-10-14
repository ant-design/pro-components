import { ProList } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import { useState } from 'react';

type Project = { id: number; title: string };
const projects: Project[] = [
  { id: 1, title: '智慧零售平台' },
  { id: 2, title: '数据可视化引擎' },
];

export default () => {
  const [size, setSize] = useState<'small' | 'default' | 'large'>('default');

  return (
    <>
      <Segmented
        value={size}
        onChange={(value) => setSize(value as typeof size)}
        options={[
          { label: '紧凑', value: 'small' },
          { label: '默认', value: 'default' },
          { label: '宽松', value: 'large' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <ProList<Project>
        rowKey="id"
        size={size}
        dataSource={projects}
        columns={[{ dataIndex: 'title', listSlot: 'title' }]}
      />
    </>
  );
};
