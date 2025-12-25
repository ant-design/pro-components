import { ProCard } from '@ant-design/pro-components';
import { Statistic } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Divider } = ProCard;

export default () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <div style={{ padding: 24 }}>

    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard.Group
        title="Core Metrics"
        direction={responsive ? 'column' : 'row'}
      >
        <ProCard>
          <Statistic title="Today's UV" value={79.0} precision={2} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="Frozen Amount" value={112893.0} precision={2} />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic
            title="Information Completeness"
            value={93}
            suffix="/ 100"
          />
        </ProCard>
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <ProCard>
          <Statistic title="Frozen Amount" value={112893.0} />
        </ProCard>
      </ProCard.Group>
    </RcResizeObserver>
  
    </div>
  );
};
