import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard
        title="默认卡片类型"
        tooltip="type: default"
        style={{ maxWidth: 300 }}
      >
        <div>这是默认类型的卡片</div>
      </ProCard>
      <ProCard
        title="内嵌卡片类型"
        tooltip="type: inner"
        type="inner"
        style={{ maxWidth: 300, marginBlockStart: 24 }}
      >
        <div>这是内嵌类型的卡片</div>
      </ProCard>
    </>
  );
};

export default Demo;
