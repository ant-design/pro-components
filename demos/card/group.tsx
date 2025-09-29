import { ProCard } from '@xxlabs/pro-components';

export default () => {
  return (
    <>
      <ProCard collapsible ghost gutter={8} title="Card Group Expanded">
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
