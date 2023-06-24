import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <ProCard
      title="标题"
      extra="extra"
      tooltip="这是提示"
      style={{ maxWidth: 300 }}
      bordered
    >
      内容
    </ProCard>
  );
};
