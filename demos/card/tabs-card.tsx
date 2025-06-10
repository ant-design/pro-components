import { ProCard } from '@ant-design/pro-components;

export default () => {
  return (
    <ProCard
      tabs={{
        type: 'card',
      }}
    >
      <ProCard.TabPane key="tab1" tab="Product One">
        Content One
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="Product Two">
        Content Two
      </ProCard.TabPane>
    </ProCard>
  );
};
