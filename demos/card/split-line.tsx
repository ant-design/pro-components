import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard title="无分割线">
        <ProCard.Group title="无分割线" tooltip="split: false">
          <ProCard title="卡片 1">内容 1</ProCard>
          <ProCard title="卡片 2">内容 2</ProCard>
          <ProCard title="卡片 3">内容 3</ProCard>
        </ProCard.Group>
      </ProCard>

      <ProCard title="垂直分割线" style={{ marginBlockStart: 24 }}>
        <ProCard.Group
          title="垂直分割线"
          tooltip="split: vertical"
          split="vertical"
        >
          <ProCard title="卡片 1">内容 1</ProCard>
          <ProCard title="卡片 2">内容 2</ProCard>
          <ProCard title="卡片 3">内容 3</ProCard>
        </ProCard.Group>
      </ProCard>

      <ProCard title="水平分割线" style={{ marginBlockStart: 24 }}>
        <ProCard.Group
          title="水平分割线"
          tooltip="split: horizontal"
          split="horizontal"
          direction="column"
        >
          <ProCard title="卡片 1">内容 1</ProCard>
          <ProCard title="卡片 2">内容 2</ProCard>
          <ProCard title="卡片 3">内容 3</ProCard>
        </ProCard.Group>
      </ProCard>
    </>
  );
};

export default Demo;
