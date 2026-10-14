import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard
        title="Title"
        extra="extra"
        layout="center"
        direction="column"
        style={{ maxWidth: 300, height: 200 }}
      >
        <div>123</div>
        <div>456</div>
      </ProCard>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
