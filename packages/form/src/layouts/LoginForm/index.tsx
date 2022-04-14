import { ConfigProvider } from 'antd';
import React, { useContext, useMemo } from 'react';
import type { ProFormProps } from '../ProForm';
import { ProForm } from '../ProForm';
import { useIntl } from '@ant-design/pro-provider';

import './index.less';

export type LoginFormProps<T> = {
  /**
   * @name form 顶部的一个提示配置，可以配置一些错误的提示信息
   * @example <caption>提示登录异常</caption>
   * message={<Alert message="登录异常，请重试！"/>}
   */
  message: React.ReactNode | false;
  /**
   * @name 标题，可以配置为空
   */
  title: React.ReactNode | false;
  /**
   * @name 二级标题，可以配置为空
   */
  subTitle: React.ReactNode | false;
  /**
   * @name 自定义额外的登录功能
   *
   * @example <caption>配置支付宝登录</caption>
   * actions={<a>跳转支付宝登录</a>}
   *
   * @example <caption>使用图标</caption>
   * actions={<a><Icon type="alipay" />跳转支付宝登录</a>}
   */
  actions: React.ReactNode;
  /**
   * @name logo 的配置，支持node 和 string
   */
  logo?: React.ReactNode | string;
  children?: React.ReactNode | React.ReactNode[];
} & ProFormProps<T>;

function LoginForm<T = Record<string, any>>(props: Partial<LoginFormProps<T>>) {
  const { logo, message, title, subTitle, actions, children, ...proFormProps } = props;

  const intl = useIntl();

  const submitter = {
    searchConfig: {
      submitText: intl.getMessage('loginForm.submitText', '登录'),
    },
    render: (_, dom) => dom.pop(),
    submitButtonProps: {
      size: 'large',
      style: {
        width: '100%',
      },
    },
    ...proFormProps.submitter,
  } as ProFormProps['submitter'];

  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-form-login');
  const getCls = (className: string) => `${baseClassName}-${className}`;

  /** 生成logo 的dom，如果是string 设置为图片 如果是个 dom 就原样保留 */
  const logoDom = useMemo(() => {
    if (!logo) return null;
    if (typeof logo === 'string') {
      return <img src={logo} />;
    }
    return logo;
  }, [logo]);

  return (
    <div className={getCls('container')}>
      <div className={getCls('top')}>
        {title || logoDom ? (
          <div className={getCls('header')}>
            {logoDom ? <span className={getCls('logo')}>{logoDom}</span> : null}
            {title ? <span className={getCls('title')}>{title}</span> : null}
          </div>
        ) : null}
        {subTitle ? <div className={getCls('desc')}>{subTitle}</div> : null}
      </div>
      <div className={getCls('main')}>
        <ProForm isKeyPressSubmit {...proFormProps} submitter={submitter}>
          {message}
          {children}
        </ProForm>
        {actions ? <div className={getCls('other')}>{actions}</div> : null}
      </div>
    </div>
  );
}
export { LoginForm };
