import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard
        title="默认布局"
        tooltip="layout: default"
        style={{ maxWidth: 300 }}
      >
        <div>内容左对齐</div>
        <div>这是默认的内容布局</div>
      </ProCard>
      <ProCard
        title="居中布局"
        tooltip="layout: center"
        layout="center"
        style={{ maxWidth: 300, marginBlockStart: 24 }}
      >
        <div>内容居中对齐</div>
        <div>这是居中的内容布局</div>
      </ProCard>
    </>
  );
};

export default Demo;
