import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';

export default () => (
  <ProForm
    initialValues={{ name: '用户认证服务' }}
    onFinish={async ({ name }) => {
      message.success(`已保存 ${name}`);
    }}
  >
    <ProFormText name="name" label="服务名称" width="sm" />
  </ProForm>
);
