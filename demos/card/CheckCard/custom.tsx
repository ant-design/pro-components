import { CheckCard } from '@ant-design/pro-components';

const Demo = () => (
  <>
    <CheckCard
      title="Card title"
      description="This is the description"
      style={{ width: 200, height: 200 }}
    />
  </>
);

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
