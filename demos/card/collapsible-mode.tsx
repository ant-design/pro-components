import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard title="不可折叠">
        <ProCard
          title="不可折叠的卡片"
          tooltip="collapsible: false（默认）"
          extra="内容"
          style={{ marginBlockStart: 16 }}
        >
          <div>这个卡片不能折叠</div>
        </ProCard>
      </ProCard>

      <ProCard title="图标触发折叠" style={{ marginBlockStart: 24 }}>
        <ProCard
          title="图标触发的卡片"
          tooltip="collapsible: icon"
          collapsible
          extra="内容"
          style={{ marginBlockStart: 16 }}
        >
          <div>点击右上角的图标可以折叠此卡片</div>
        </ProCard>
      </ProCard>

      <ProCard title="标题触发折叠" style={{ marginBlockStart: 24 }}>
        <ProCard
          title="标题触发的卡片"
          tooltip="collapsible: header"
          collapsible="header"
          extra="内容"
          style={{ marginBlockStart: 16 }}
        >
          <div>点击标题可以折叠此卡片</div>
        </ProCard>
      </ProCard>
    </>
  );
};

export default Demo;
