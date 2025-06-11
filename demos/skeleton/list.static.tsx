import { ProSkeleton } from '@ant-design/pro-components';
export default () => (
  <div
    style={{
      background: '#fafafa',
      padding: 24,
    }}
  >
    <ProSkeleton statistic={2} type="list" />
  </div>
);
