import React, { useState } from 'react';
import { Statistic } from 'antd';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';

const { Divider } = ProCard;

export default () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard.Group title="核心指标" direction={responsive ? 'column' : 'row'}>
        <ProCard>
          <Statistic title="今日UV" value={79.0} precision={2} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="冻结金额" value={112893.0} precision={2} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="信息完整度" value={93} suffix="/ 100" />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="冻结金额" value={112893.0} />
        </ProCard>
      </ProCard.Group>
    </RcResizeObserver>
  );
};
