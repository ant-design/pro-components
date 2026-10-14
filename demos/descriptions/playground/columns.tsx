import { ProDescriptions } from '@ant-design/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';
import { descriptionData } from './data';

export default () => {
  const [showOwner, setShowOwner] = useState(true);
  return (
    <div>
      <Switch
        checked={showOwner}
        onChange={setShowOwner}
        checkedChildren="显示负责人"
        unCheckedChildren="隐藏负责人"
        style={{ marginBlockEnd: 16 }}
      />
      <ProDescriptions
        dataSource={descriptionData}
        columns={[
          { title: '服务', dataIndex: 'name' },
          ...(showOwner ? [{ title: '负责人', dataIndex: 'owner' }] : []),
        ]}
      />
    </div>
  );
};
