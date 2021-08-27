import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { mount } from 'enzyme';
import { waitForComponentToPaint } from '../util';
import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Space } from 'antd';

describe('LoginForm', () => {
  it('📦 LoginForm should show login message correctly', async () => {
    const loginMessage = <Alert type="error" message="登录失败"></Alert>;

    const wrapper = mount(
      <LoginForm message={loginMessage}>
        <ProFormText name="name" />
      </LoginForm>,
    );
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-alert.ant-alert-error').length).toEqual(1);
    expect(wrapper.find('.ant-alert.ant-alert-error .ant-alert-message').text()).toEqual(
      '登录失败',
    );
  });

  it('📦 LoginForm should render actions correctly', async () => {
    const wrapper = mount(
      <LoginForm
        actions={
          <Space>
            其他登录方式
            <AlipayCircleOutlined></AlipayCircleOutlined>
            <TaobaoCircleOutlined></TaobaoCircleOutlined>
            <WeiboCircleOutlined></WeiboCircleOutlined>
          </Space>
        }
      >
        <ProFormText name="name" />
      </LoginForm>,
    );
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-form-login-other .anticon').length).toEqual(3);
  });

  it('📦 LoginForm support string logo', async () => {
    const wrapper = mount(
      <LoginForm logo="https://avatars.githubusercontent.com/u/8186664?v=4">
        <ProFormText name="name" />
      </LoginForm>,
    );
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-form-login-logo img').exists()).toBeTruthy();
    expect(wrapper.find('.ant-pro-form-login-logo img').props().src).toBe(
      'https://avatars.githubusercontent.com/u/8186664?v=4',
    );
  });

  it('📦 LoginForm support react node logo', async () => {
    const wrapper = mount(
      <LoginForm logo={<img id="test" src="https://avatars.githubusercontent.com/u/8186664?v=4" />}>
        <ProFormText name="name" />
      </LoginForm>,
    );
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-form-login-logo #test').exists()).toBeTruthy();
    expect(wrapper.find('.ant-pro-form-login-logo #test').props().src).toBe(
      'https://avatars.githubusercontent.com/u/8186664?v=4',
    );
  });
});
