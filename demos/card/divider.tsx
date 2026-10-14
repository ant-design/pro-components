import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from '@rc-component/resize-observer';
import { Statistic } from 'antd';
import { useState } from 'react';

export default () => {
  const [narrow, setNarrow] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <RcResizeObserver onResize={({ width }) => setNarrow(width < 480)}>
        <ProCard.Group direction={narrow ? 'column' : 'row'}>
          <ProCard>
            <Statistic title="今日访问" value={7900} />
          </ProCard>
          <ProCard.Divider orientation={narrow ? 'horizontal' : 'vertical'} />
          <ProCard>
            <Statistic title="新用户" value={320} />
          </ProCard>
        </ProCard.Group>
      </RcResizeObserver>
    </div>
  );
};
