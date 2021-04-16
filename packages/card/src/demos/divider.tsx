import React from 'react';
import { Statistic } from 'antd';
import ProCard from '@ant-design/pro-card';

const { Divider } = ProCard;

export default () => {
  return (
    <ProCard.Group title="核心指标">
      <ProCard>
        <Statistic title="今日UV" value={79.0} precision={2} />
      </ProCard>
      <Divider />
      <ProCard>
        <Statistic title="冻结金额" value={112893.0} precision={2} />
      </ProCard>
      <Divider />
      <ProCard>
        <Statistic title="信息完整度" value={93} suffix="/ 100" />
      </ProCard>
      <ProCard>
        <Statistic title="冻结金额" value={112893.0} />
      </ProCard>
    </ProCard.Group>
  );
};
