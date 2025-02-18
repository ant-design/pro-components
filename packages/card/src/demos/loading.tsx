import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard loading style={{ maxWidth: 300 }}>
        Content
      </ProCard>

      <ProCard
        loading
        style={{ maxWidth: 300, marginBlockStart: 16 }}
        layout="center"
      >
        Content
      </ProCard>

      <ProCard
        title="Custom Loading"
        extra="extra"
        loading={<div>Loading</div>}
        style={{ maxWidth: 300, marginBlockStart: 16 }}
      >
        Content
      </ProCard>
    </>
  );
};
