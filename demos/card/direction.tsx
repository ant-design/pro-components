import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard title="水平方向子卡片">
        <ProCard.Group
          title="水平排列"
          tooltip="direction: row"
          direction="row"
        >
          <ProCard title="卡片 1">内容 1</ProCard>
          <ProCard title="卡片 2">内容 2</ProCard>
          <ProCard title="卡片 3">内容 3</ProCard>
        </ProCard.Group>
      </ProCard>
      <ProCard title="垂直方向子卡片" style={{ marginBlockStart: 24 }}>
        <ProCard.Group
          title="垂直排列"
          tooltip="direction: column"
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
