import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { waitForComponentToPaint } from '../util';
import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';

describe('LoginForm', () => {
  it('📦 LoginForm should show login message correctly', async () => {
    const wrapper = mount(
      <LoginForm loginMessage={{ type: 'error', message: '登录失败' }}>
        <ProFormText name="name" />
      </LoginForm>,
    );
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-alert.ant-alert-error').length).toEqual(1);
    expect(wrapper.find('.ant-alert.ant-alert-error .ant-alert-message').text()).toEqual(
      '登录失败',
    );
  });

  it('📦 LoginForm should render other login methods correctly', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <LoginForm
        otherLoginMethodsProps={{
          methods: [
            {
              icon: AlipayCircleOutlined,
              key: 'alipay',
            },
            {
              icon: WeiboCircleOutlined,
              key: 'weibo',
            },
            {
              icon: TaobaoCircleOutlined,
              key: 'taobao',
            },
          ],
          onClick: (e) => {
            fn(e);
          },
        }}
      >
        <ProFormText name="name" />
      </LoginForm>,
    );
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-form-login-other .anticon').length).toEqual(3);

    act(() => {
      wrapper.find('.ant-pro-form-login-other .anticon').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);
    expect(fn.mock.calls.length).toEqual(1);
  });
});
