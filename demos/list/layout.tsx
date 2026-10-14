import { ProList } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import { useState } from 'react';

type Project = { id: number; title: string; description: string };
const projects: Project[] = [
  { id: 1, title: '智慧零售平台', description: '面向门店的数字化经营方案' },
  { id: 2, title: '数据可视化引擎', description: '帮助团队分析业务数据' },
];

export default () => {
  const [itemLayout, setItemLayout] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );

  return (
    <>
      <Segmented
        value={itemLayout}
        onChange={(value) => setItemLayout(value as typeof itemLayout)}
        options={[
          { label: '水平', value: 'horizontal' },
          { label: '垂直', value: 'vertical' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <ProList<Project>
        rowKey="id"
        itemLayout={itemLayout}
        dataSource={projects}
        columns={[
          { dataIndex: 'title', listSlot: 'title' },
          { dataIndex: 'description', listSlot: 'description' },
          { listSlot: 'content', render: () => '项目内容摘要' },
        ]}
      />
    </>
  );
};
