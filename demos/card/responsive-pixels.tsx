import { ProCard } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 16 }}>
    <ProCard title="colSpan 像素宽度" gutter={8}>
      <ProCard colSpan={{ xs: '120px', sm: '180px' }} variant="outlined">
        固定宽度
      </ProCard>
      <ProCard variant="outlined">剩余空间</ProCard>
    </ProCard>
  </div>
);
