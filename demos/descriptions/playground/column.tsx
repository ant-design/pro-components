import { ProDescriptions } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import { useState } from 'react';
import { descriptionData } from './data';

export default () => {
  const [column, setColumn] = useState(2);
  return (
    <div>
      <Segmented
        options={[
          { label: '一列', value: 1 },
          { label: '两列', value: 2 },
        ]}
        value={column}
        onChange={(value) => setColumn(Number(value))}
        style={{ marginBlockEnd: 16 }}
      />
      <ProDescriptions
        column={column}
        dataSource={descriptionData}
        columns={[
          { title: '服务', dataIndex: 'name' },
          { title: '负责人', dataIndex: 'owner' },
        ]}
      />
    </div>
  );
};
