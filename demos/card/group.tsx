import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard title="Card Group Expanded" ghost gutter={8} collapsible>
        <ProCard layout="center" variant="outlined">
          Card Content
        </ProCard>
        <ProCard layout="center" variant="outlined">
          Card Content
        </ProCard>
        <ProCard layout="center" variant="outlined">
          Card Content
        </ProCard>
      </ProCard>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
