import { ProCard } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 16 }}>
    <ProCard title="colSpan 响应式栅格" gutter={8} wrap>
      <ProCard colSpan={{ xs: 24, sm: 8 }} variant="outlined">
        设计
      </ProCard>
      <ProCard colSpan={{ xs: 24, sm: 8 }} variant="outlined">
        开发
      </ProCard>
      <ProCard colSpan={{ xs: 24, sm: 8 }} variant="outlined">
        测试
      </ProCard>
    </ProCard>
  </div>
);
