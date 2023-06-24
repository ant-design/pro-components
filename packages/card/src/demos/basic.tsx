import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard
        title="默认尺寸"
        extra="extra"
        tooltip="这是提示"
        style={{ maxWidth: 300 }}
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
      <ProCard
        title="小尺寸卡片"
        extra="extra"
        tooltip="这是提示"
        style={{ maxWidth: 300, marginBlockStart: 24 }}
        size="small"
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
    </>
  );
};
