import { BetaSchemaForm } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 8 }}>
    <BetaSchemaForm
      layoutType="Form"
      grid
      rowProps={{ gutter: [16, 0] }}
      columns={[
        { title: '项目名称', dataIndex: 'name', colProps: { xs: 24, md: 12 } },
        { title: '负责人', dataIndex: 'owner', colProps: { xs: 24, md: 12 } },
      ]}
    />
  </div>
);
