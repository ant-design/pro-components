import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [action, setAction] = useState('尚未选择操作');

  return (
    <ProCard
      title="任务卡片"
      style={{ width: '100%', maxWidth: 360 }}
      actions={[
        <Button
          key="settings"
          type="text"
          icon={<SettingOutlined />}
          onClick={() => setAction('已选择设置')}
        >
          设置
        </Button>,
        <Button
          key="edit"
          type="text"
          icon={<EditOutlined />}
          onClick={() => setAction('已选择编辑')}
        >
          编辑
        </Button>,
      ]}
    >
      {action}
    </ProCard>
  );
};
