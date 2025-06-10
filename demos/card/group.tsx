import { ProCard } from '@ant-design/pro-components;

export default () => {
  return (
    <>
      <ProCard title="Card Group Expanded" ghost gutter={8} collapsible>
        <ProCard layout="center" bordered>
          Card Content
        </ProCard>
        <ProCard layout="center" bordered>
          Card Content
        </ProCard>
        <ProCard layout="center" bordered>
          Card Content
        </ProCard>
      </ProCard>
    </>
  );
};
