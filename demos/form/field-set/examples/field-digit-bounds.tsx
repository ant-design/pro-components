import { ProForm, ProFormDigit } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ count: 3 }}>
    <ProFormDigit name="count" label="数量" min={1} max={10} width="sm" />
  </ProForm>
);
