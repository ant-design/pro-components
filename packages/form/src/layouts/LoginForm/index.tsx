import { useIntl } from '@ant-design/pro-provider';
import { ConfigProvider } from 'antd';
import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import type { SubmitterProps } from '../../components';
import type { ProFormProps } from '../ProForm';
import { ProForm } from '../ProForm';
import { useStyle } from './style';

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
   * @name logo 的配置，支持 ReactNode 和 url
   *
   * @example 配置为一个图标
   * logo={<Icon type="alipay" />}
   * @example 配置为一个路径
   * logo="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
   */
  logo?: React.ReactNode;
  children?: React.ReactNode | React.ReactNode[];

  /**
   * @name 登录框主表格的样式
   */
  contentStyle?: React.CSSProperties;
  /**
   * @name 登录框容器的样式
   */
  containerStyle?: React.CSSProperties;
  otherStyle?: React.CSSProperties;
} & Omit<ProFormProps<T>, 'title'>;

function LoginForm<T = Record<string, any>>(props: Partial<LoginFormProps<T>>) {
  const {
    logo,
    message,
    contentStyle,
    title,
    subTitle,
    actions,
    children,
    containerStyle,
    otherStyle,
    ...proFormProps
  } = props;

  const intl = useIntl();

  const submitter =
    proFormProps.submitter === false
      ? false
      : ({
          searchConfig: {
            submitText: intl.getMessage('loginForm.submitText', '登录'),
          },
          ...proFormProps.submitter,
          submitButtonProps: {
            size: 'large',
            style: {
              width: '100%',
            },
            ...proFormProps.submitter?.submitButtonProps,
          },
          render: (_, dom) => {
            const loginButton = dom.pop();
            if (
              typeof (proFormProps?.submitter as SubmitterProps)?.render ===
              'function'
            ) {
              return (
                proFormProps?.submitter as {
                  render: Exclude<SubmitterProps['render'], false>;
                }
              )?.render?.(_, dom);
            }
            return loginButton;
          },
        } as ProFormProps['submitter']);

  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-form-login');
  const { wrapSSR, hashId } = useStyle(baseClassName);
  const getCls = (className: string) =>
    `${baseClassName}-${className} ${hashId}`;

  /** 生成logo 的dom，如果是string 设置为图片 如果是个 dom 就原样保留 */
  const logoDom = useMemo(() => {
    if (!logo) return null;
    if (typeof logo === 'string') {
      return <img src={logo} />;
    }
    return logo;
  }, [logo]);

  return wrapSSR(
    <div
      className={classNames(getCls('container'), hashId)}
      style={containerStyle}
    >
      <div className={`${getCls('top')} ${hashId}`.trim()}>
        {title || logoDom ? (
          <div className={`${getCls('header')}`}>
            {logoDom ? <span className={getCls('logo')}>{logoDom}</span> : null}
            {title ? <span className={getCls('title')}>{title}</span> : null}
          </div>
        ) : null}
        {subTitle ? <div className={getCls('desc')}>{subTitle}</div> : null}
      </div>
      <div
        className={getCls('main')}
        style={{
          width: 328,
          ...contentStyle,
        }}
      >
        <ProForm isKeyPressSubmit {...proFormProps} submitter={submitter}>
          {message}
          {children}
        </ProForm>
        {actions ? (
          <div className={getCls('main-other')} style={otherStyle}>
            {actions}
          </div>
        ) : null}
      </div>
    </div>,
  );
}
export { LoginForm };
