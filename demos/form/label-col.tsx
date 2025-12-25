import {
  ProForm,
  ProFormCheckbox,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
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
      <ProForm
        {...layout}
        layout="horizontal"
        submitter={false}
        name="basic"
        initialValues={{ remember: true }}
      >
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </ProForm.Item>
      </ProForm>
    </>
  );
};
