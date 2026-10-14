import { ProForm, ProFormRate } from '@ant-design/pro-components';

export default () => (
  <ProForm readonly submitter={false} initialValues={{ value: 3.5 }}>
    <ProFormRate name="value" label="评分" />
  </ProForm>
);
