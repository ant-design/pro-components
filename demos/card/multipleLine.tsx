import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
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
          variant="outlined"
        >
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          layout="center"
          variant="outlined"
        >
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          layout="center"
          variant="outlined"
        >
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          variant="outlined"
        >
          Col
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
