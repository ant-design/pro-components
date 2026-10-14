/** Title: 基本使用 */
import { CheckCard } from '@ant-design/pro-components';
import { Typography } from 'antd';
import { useState } from 'react';

export default () => {
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ padding: 24 }}>
      <CheckCard
        title="流程编排"
        description="选择后查看当前状态。"
        checked={checked}
        onChange={setChecked}
      />
      <Typography.Text>checked：{String(checked)}</Typography.Text>
    </div>
  );
};
