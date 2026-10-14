import { ProForm, ProFormSlider } from '@ant-design/pro-components';

export default () => (
  <ProForm readonly submitter={false} initialValues={{ value: 60 }}>
    <ProFormSlider name="value" label="进度" />
  </ProForm>
);
