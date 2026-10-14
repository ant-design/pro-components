import { ProDescriptions } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import { useState } from 'react';
import { descriptionData } from './data';

export default () => {
  const [size, setSize] = useState<'default' | 'middle' | 'small'>('default');
  return (
    <div>
      <Segmented
        options={[
          { label: '默认', value: 'default' },
          { label: '中', value: 'middle' },
          { label: '小', value: 'small' },
        ]}
        value={size}
        onChange={(value) => setSize(value as typeof size)}
        style={{ marginBlockEnd: 16 }}
      />
      <ProDescriptions
        size={size}
        dataSource={descriptionData}
        columns={[
          { title: '服务', dataIndex: 'name' },
          { title: '负责人', dataIndex: 'owner' },
        ]}
      />
    </div>
  );
};
