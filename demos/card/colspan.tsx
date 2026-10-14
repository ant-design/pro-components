import { ProCard } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 16 }}>
    <ProCard title="24 栅格中的两个半宽卡片" gutter={8}>
      <ProCard colSpan={12} variant="outlined">
        设计
      </ProCard>
      <ProCard colSpan={12} variant="outlined">
        开发
      </ProCard>
    </ProCard>
  </div>
);
