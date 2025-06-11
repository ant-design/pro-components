import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard
        title="Horizontal Inner Card"
        variant="outlined"
        headerBordered
        gutter={16}
      >
        <ProCard title="Inner Card Title" type="inner" variant="outlined">
          Inner Card Content
        </ProCard>
        <ProCard title="Inner Card Title" type="inner" variant="outlined">
          Inner Card Content
        </ProCard>
      </ProCard>

      <ProCard
        title="Vertical Inner Card"
        variant="outlined"
        headerBordered
        direction="column"
        gutter={[0, 16]}
        style={{ marginBlockStart: 8 }}
      >
        <ProCard title="Inner Card Title" type="inner" variant="outlined">
          Inner Card Content
        </ProCard>
        <ProCard title="Inner Card Title" type="inner" variant="outlined">
          Inner Card Content
        </ProCard>
      </ProCard>
    </>
  );
};
