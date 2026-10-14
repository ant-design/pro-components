import { BetaSchemaForm } from '@ant-design/pro-components';

export default () => (
  <div style={{ maxWidth: 560 }}>
    <BetaSchemaForm
      layoutType="Form"
      initialValues={{ code: 'project-a' }}
      columns={[
        {
          title: '项目代码',
          dataIndex: 'code',
          convertValue: (value: string) => value.toUpperCase(),
        },
      ]}
    />
  </div>
);
