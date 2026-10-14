import { ProCard } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 16 }}>
    <ProCard.Group title="纵向排列" direction="column">
      <ProCard title="设计">已完成</ProCard>
      <ProCard title="开发">进行中</ProCard>
    </ProCard.Group>
  </div>
);
