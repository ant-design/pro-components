import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard title="横向内部卡片" bordered headerBordered gutter={16}>
        <ProCard title="内部卡片标题" type="inner" bordered>
          内部卡片内容
        </ProCard>
        <ProCard title="内部卡片标题" type="inner" bordered>
          内部卡片内容
        </ProCard>
      </ProCard>

      <ProCard
        title="竖向内部卡片"
        bordered
        headerBordered
        direction="column"
        gutter={[0, 16]}
        style={{ marginBlockStart: 8 }}
      >
        <ProCard title="内部卡片标题" type="inner" bordered>
          内部卡片内容
        </ProCard>
        <ProCard title="内部卡片标题" type="inner" bordered>
          内部卡片内容
        </ProCard>
      </ProCard>
    </>
  );
};
