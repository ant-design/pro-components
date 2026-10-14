import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <ProCard
      title="自定义操作区"
      style={{ width: '100%', maxWidth: 360 }}
      actions={
        <Button type="link" onClick={() => setEnabled((value) => !value)}>
          {enabled ? '关闭提醒' : '开启提醒'}
        </Button>
      }
    >
      提醒状态：{enabled ? '已开启' : '已关闭'}
    </ProCard>
  );
};
