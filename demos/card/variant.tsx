import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard
        title="线框外观"
        tooltip="variant: outlined"
        variant="outlined"
        style={{ maxWidth: 300 }}
      >
        <div>这是线框外观的卡片</div>
      </ProCard>
      <ProCard
        title="无边框外观"
        tooltip="variant: borderless"
        variant="borderless"
        style={{ maxWidth: 300, marginBlockStart: 24 }}
      >
        <div>这是无边框外观的卡片</div>
      </ProCard>
    </>
  );
};

export default Demo;
