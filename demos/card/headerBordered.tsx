import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <ProCard
      title="Title"
      extra="extra"
      tooltip="This is a tooltip"
      style={{ maxWidth: 300 }}
      headerBordered
    >
      Content
    </ProCard>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
