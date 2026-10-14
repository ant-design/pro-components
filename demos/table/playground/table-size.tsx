import { ProTable } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import { useState } from 'react';
import { columns, rows } from './data';

export default () => {
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('middle');
  return (
    <div>
      <Segmented
        options={[
          { label: '小', value: 'small' },
          { label: '中', value: 'middle' },
          { label: '大', value: 'large' },
        ]}
        value={size}
        onChange={(value) => setSize(value as typeof size)}
        style={{ marginBlockEnd: 16 }}
      />
      <ProTable
        rowKey="id"
        dataSource={rows}
        columns={columns}
        size={size}
        search={false}
        options={false}
        pagination={false}
      />
    </div>
  );
};
