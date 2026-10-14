import { ProForm, ProFormCaptcha } from '@ant-design/pro-components';
import { message } from 'antd';

export default () => (
  <ProForm submitter={false}>
    <ProFormCaptcha
      name="code"
      label="验证码"
      width="sm"
      countDown={10}
      onGetCaptcha={async () => {
        message.success('模拟发送成功');
      }}
    />
  </ProForm>
);
