import { ProDescriptions } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import { useState } from 'react';
import { descriptionData } from './data';

export default () => {
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');
  return (
    <div>
      <Segmented
        options={[
          { label: '水平', value: 'horizontal' },
          { label: '垂直', value: 'vertical' },
        ]}
        value={layout}
        onChange={(value) => setLayout(value as typeof layout)}
        style={{ marginBlockEnd: 16 }}
      />
      <ProDescriptions
        layout={layout}
        dataSource={descriptionData}
        columns={[
          { title: '服务', dataIndex: 'name' },
          { title: '负责人', dataIndex: 'owner' },
        ]}
      />
    </div>
  );
};
