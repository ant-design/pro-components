import {
  LoginForm,
  ProFormText,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormImageCaptcha,
} from '@ant-design/pro-form';
import type { ImageCaptcha } from '@ant-design/pro-form';
import {
  UserOutlined,
  MobileOutlined,
  LockOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { message, Tabs, Space } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  marginLeft: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

export default () => {
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const [imageCaptcha, setImageCaptcha] = useState<ImageCaptcha>();

  const getImageCaptchaHandle = async () => {
    try {
      setImageCaptcha({
        captchaImage:
          'data:image/png;base64,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',
        validityInSeconds: 900,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <LoginForm
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Github"
        subTitle="全球最大同性交友网站"
        actions={
          <Space>
            其他登录方式
            <AlipayCircleOutlined style={iconStyles}></AlipayCircleOutlined>
            <TaobaoCircleOutlined style={iconStyles}></TaobaoCircleOutlined>
            <WeiboCircleOutlined style={iconStyles}></WeiboCircleOutlined>
          </Space>
        }
      >
        <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名: admin or user'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'密码: ant.design'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <ProFormImageCaptcha
              name="captcha"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'验证码'}
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              captcha={imageCaptcha}
              onGetCaptcha={getImageCaptchaHandle}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'} />,
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginForm>
    </div>
  );
};
