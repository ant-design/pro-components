import { ProForm, ProFormRate } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ rating: 3.5 }}>
    <ProFormRate name="rating" label="评分" />
  </ProForm>
);
