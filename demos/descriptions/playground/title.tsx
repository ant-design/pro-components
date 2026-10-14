import { ProDescriptions } from '@ant-design/pro-components';
import { Input } from 'antd';
import { useState } from 'react';
import { descriptionData } from './data';

export default () => {
  const [title, setTitle] = useState('服务详情');
  return (
    <div>
      <Input
        aria-label="修改标题"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        style={{ maxWidth: 240, marginBlockEnd: 16 }}
      />
      <ProDescriptions
        title={title}
        dataSource={descriptionData}
        columns={[
          { title: '服务', dataIndex: 'name' },
          { title: '负责人', dataIndex: 'owner' },
        ]}
      />
    </div>
  );
};
