import { ProList } from '@ant-design/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';

type Project = { id: number; title: string };
const projects: Project[] = [
  { id: 1, title: '智慧零售平台' },
  { id: 2, title: '数据可视化引擎' },
];

export default () => {
  const [split, setSplit] = useState(true);

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Switch checked={split} onChange={setSplit} /> 显示分割线
      </div>
      <ProList<Project>
        rowKey="id"
        split={split}
        dataSource={projects}
        columns={[{ dataIndex: 'title', listSlot: 'title' }]}
      />
    </>
  );
};
