import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard gutter={[16, 16]}>
        <ProCard colSpan="30%" title="title" headerBordered variant="outlined">
          300px
        </ProCard>
        <ProCard variant="outlined">Auto</ProCard>
      </ProCard>

      <ProCard
        gutter={[{ xs: 8, sm: 8, md: 16, lg: 24, xl: 32 }, 16]}
        style={{ marginBlockStart: 16 }}
      >
        <ProCard variant="outlined">Responsive</ProCard>
        <ProCard variant="outlined">Responsive</ProCard>
        <ProCard variant="outlined">Responsive</ProCard>
      </ProCard>

      <ProCard gutter={16} style={{ marginBlockStart: 16 }}>
        <ProCard variant="outlined">Auto</ProCard>
        <ProCard variant="outlined">Auto</ProCard>
        <ProCard variant="outlined">Auto</ProCard>
      </ProCard>
    </>
  );
};
