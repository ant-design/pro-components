import { ProDescriptions } from '@ant-design/pro-components';
import { Space, Switch } from 'antd';
import { useState } from 'react';
import { descriptionData } from './data';

export default () => {
  const [loading, setLoading] = useState(false);
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Switch
        checked={loading}
        onChange={setLoading}
        checkedChildren="加载中"
        unCheckedChildren="已加载"
      />
      <ProDescriptions
        loading={loading}
        dataSource={descriptionData}
        columns={[
          { title: '服务', dataIndex: 'name' },
          { title: '负责人', dataIndex: 'owner' },
        ]}
      />
    </Space>
  );
};
