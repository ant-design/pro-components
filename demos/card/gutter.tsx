import { ProCard } from '@ant-design/pro-components';

export default () => (
  <ProCard gutter={[16, 16]} wrap>
    <ProCard colSpan={{ xs: 24, sm: 12 }} variant="outlined">
      项目概览
    </ProCard>
    <ProCard colSpan={{ xs: 24, sm: 12 }} variant="outlined">
      运行状态
    </ProCard>
  </ProCard>
);
