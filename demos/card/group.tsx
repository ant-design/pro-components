import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <div style={{ padding: 24 }}>

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
  
    </div>
  );
};
