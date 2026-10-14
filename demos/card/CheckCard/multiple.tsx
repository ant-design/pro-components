import { CheckCard } from '@ant-design/pro-components';
import { Typography } from 'antd';
import { useState } from 'react';

export default () => {
  const [selected, setSelected] = useState<string[]>(['A']);

  return (
    <div style={{ padding: 24 }}>
      <CheckCard.Group
        multiple
        value={selected}
        onChange={(value) => setSelected(value as string[])}
      >
        <CheckCard title="选项 A" value="A" />
        <CheckCard title="选项 B" value="B" />
      </CheckCard.Group>
      <Typography.Text>当前选择：{selected.join('、') || '无'}</Typography.Text>
    </div>
  );
};
