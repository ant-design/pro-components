import { ProDescriptions } from '@ant-design/pro-components';
import { Space, Switch } from 'antd';
import { useState } from 'react';
import { descriptionData } from './data';

export default () => {
  const [bordered, setBordered] = useState(true);
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Switch
        checked={bordered}
        onChange={setBordered}
        checkedChildren="有边框"
        unCheckedChildren="无边框"
      />
      <ProDescriptions
        bordered={bordered}
        dataSource={descriptionData}
        columns={[
          { title: '服务', dataIndex: 'name' },
          { title: '负责人', dataIndex: 'owner' },
        ]}
      />
    </Space>
  );
};
