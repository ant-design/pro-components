import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard
        title="默认尺寸"
        tooltip="size: default"
        style={{ maxWidth: 300 }}
      >
        <div>这是默认尺寸的卡片</div>
      </ProCard>
      <ProCard
        title="紧凑尺寸"
        tooltip="size: small"
        style={{ maxWidth: 300, marginBlockStart: 24 }}
        size="small"
      >
        <div>这是紧凑尺寸的卡片</div>
      </ProCard>
    </>
  );
};

export default Demo;
