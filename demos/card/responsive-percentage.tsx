import { ProCard } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 16 }}>
    <ProCard title="colSpan 百分比宽度" gutter={8}>
      <ProCard colSpan={{ xs: '40%', sm: '50%' }} variant="outlined">
        百分比宽度
      </ProCard>
      <ProCard variant="outlined">剩余空间</ProCard>
    </ProCard>
  </div>
);
