import { ProForm, ProFormCheckbox } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ features: ['搜索'] }}>
    <ProFormCheckbox.Group
      name="features"
      label="功能"
      options={['搜索', '导出', '通知']}
    />
  </ProForm>
);
