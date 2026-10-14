import { ProForm, ProFormColorPicker } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{}}>
    <ProFormColorPicker name="color" label="主题色" />
  </ProForm>
);
