import { ProCard } from '../../components';

export default () => {
  return (
    <>
      <ProCard
        title="Horizontal Inner Card"
        bordered
        headerBordered
        gutter={16}
      >
        <ProCard title="Inner Card Title" type="inner" bordered>
          Inner Card Content
        </ProCard>
        <ProCard title="Inner Card Title" type="inner" bordered>
          Inner Card Content
        </ProCard>
      </ProCard>

      <ProCard
        title="Vertical Inner Card"
        bordered
        headerBordered
        direction="column"
        gutter={[0, 16]}
        style={{ marginBlockStart: 8 }}
      >
        <ProCard title="Inner Card Title" type="inner" bordered>
          Inner Card Content
        </ProCard>
        <ProCard title="Inner Card Title" type="inner" bordered>
          Inner Card Content
        </ProCard>
      </ProCard>
    </>
  );
};
