import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <div style={{ padding: 24 }}>

    <ProCard
      title="Title"
      extra="extra"
      tooltip="This is a tooltip"
      style={{ maxWidth: 300 }}
      headerBordered
    >
      Content
    </ProCard>
  
    </div>
  );
};
