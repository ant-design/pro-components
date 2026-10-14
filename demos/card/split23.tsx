import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from '@rc-component/resize-observer';
import { useState } from 'react';

export default () => {
  const [small, setSmall] = useState(false);

  return (
    <RcResizeObserver onResize={({ width }) => setSmall(width < 596)}>
      <div style={{ width: '100%' }}>
        <ProCard split={small ? 'horizontal' : 'vertical'}>
          <ProCard title="左侧详情" colSpan={small ? '100%' : '30%'}>
            左侧内容
          </ProCard>
          <ProCard title="右侧详情" headerBordered>
            右侧内容
          </ProCard>
        </ProCard>
      </div>
    </RcResizeObserver>
  );
};
