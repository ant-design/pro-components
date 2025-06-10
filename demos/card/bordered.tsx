import { ProCard } from '@ant-design/pro-components;

export default () => {
  return (
    <ProCard
      title="Title"
      extra="extra"
      tooltip="This is a tooltip"
      style={{ maxWidth: 300 }}
      bordered
    >
      Content
    </ProCard>
  );
};
