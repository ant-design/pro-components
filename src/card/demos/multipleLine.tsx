import { ProCard } from '../../components';

export default () => {
  return (
    <>
      <ProCard
        style={{ marginBlockStart: 8 }}
        gutter={[16, 16]}
        wrap
        title="Wrap"
      >
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          layout="center"
          bordered
        >
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          layout="center"
          bordered
        >
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          layout="center"
          bordered
        >
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          layout="center"
          bordered
        >
          Col
        </ProCard>
      </ProCard>
    </>
  );
};
