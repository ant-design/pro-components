import { ProForm, ProFormCheckbox, ProFormRadio, ProFormText } from '@xxlabs/pro-components';
import { Button } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default () => {
  return (
    <>
      <ProForm {...layout} initialValues={{ remember: true }} layout="horizontal" name="basic" submitter={false}>
        <ProFormText label="Name" name="name" />

        <ProFormText.Password
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        />
        <ProFormCheckbox name="remember" {...tailLayout}>
          Remember me
        </ProFormCheckbox>
        <ProFormRadio name="remember" {...tailLayout}>
          Remember me
        </ProFormRadio>
        <ProForm.Item {...tailLayout}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </ProForm.Item>
      </ProForm>
    </>
  );
};
