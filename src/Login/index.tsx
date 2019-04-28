import React, { Component } from 'react';
import { Form, Tabs } from 'antd';
import classNames from 'classnames';
import LoginItem, { LoginItemType, LoginItemProps } from './LoginItem';
import LoginTab from './LoginTab';
import styles from './index.less';
import LoginContext, { ILoginContext } from './LoginContext';
import { FormComponentProps } from 'antd/lib/form';
import LoginSubmit from './LoginSubmit';

export interface LoginProps {
  defaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (error: any, values: any) => void;
  className?: string;
  form?: FormComponentProps['form'];
  children: React.ReactElement<LoginTab>[];
}

interface LoginState {
  tabs?: string[];
  type?: string;
  active?: { [key: string]: Array<any> };
}

class Login extends Component<LoginProps, LoginState> {
  public static Tab = LoginTab;
  public static Submit = LoginSubmit;
  public static UserName: React.FunctionComponent<LoginItemProps>;
  public static Password: React.FunctionComponent<LoginItemProps>;
  public static Mobile: React.FunctionComponent<LoginItemProps>;
  public static Captcha: React.FunctionComponent<LoginItemProps>;
  static defaultProps = {
    className: '',
    defaultActiveKey: '',
    onTabChange: () => {},
    onSubmit: () => {},
  };

  constructor(props: LoginProps) {
    super(props);
    this.state = {
      type: props.defaultActiveKey,
      tabs: [],
      active: {},
    };
  }

  onSwitch = (type: string) => {
    this.setState(
      {
        type,
      },
      () => {
        const { onTabChange } = this.props;
        if (onTabChange) {
          onTabChange(type);
        }
      },
    );
  };

  getContext: () => ILoginContext = () => {
    const { form } = this.props;
    const { tabs = [] } = this.state;
    return {
      tabUtil: {
        addTab: id => {
          this.setState({
            tabs: [...tabs, id],
          });
        },
        removeTab: id => {
          this.setState({
            tabs: tabs.filter(currentId => currentId !== id),
          });
        },
      },
      form: { ...form },
      updateActive: activeItem => {
        const { type = '', active = {} } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({
          active,
        });
      },
    };
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { active = {}, type = '' } = this.state;
    const { form, onSubmit } = this.props;
    const activeFields = active[type] || [];
    form &&
      form.validateFields(activeFields, { force: true }, (err, values) => {
        onSubmit && onSubmit(err, values);
      });
  };

  render() {
    const { className, children } = this.props;
    const { type, tabs = [] } = this.state;
    const TabChildren: React.ReactComponentElement<LoginTab>[] = [];
    const otherChildren: React.ReactElement<any>[] = [];
    React.Children.forEach(
      children,
      (
        child: React.ReactComponentElement<LoginTab> | React.ReactElement<any>,
      ) => {
        if (!child) {
          return;
        }
        if (child.type.typeName === 'LoginTab') {
          TabChildren.push(child);
        } else {
          otherChildren.push(child);
        }
      },
    );
    return (
      <LoginContext.Provider value={this.getContext()}>
        <div className={classNames(className, styles.login)}>
          {tabs.length ? (
            <React.Fragment>
              <Form onSubmit={this.handleSubmit}>
                <Tabs
                  animated={false}
                  className={styles.tabs}
                  activeKey={type}
                  onChange={this.onSwitch}
                >
                  {TabChildren}
                </Tabs>
                {otherChildren}
              </Form>
            </React.Fragment>
          ) : (
            children
          )}
        </div>
      </LoginContext.Provider>
    );
  }
}
(Object.keys(LoginItem) as Array<keyof LoginItemType>).forEach(item => {
  Login[item] = LoginItem[item];
});

export default (Form.create()(Login as any) as unknown) as typeof Login;
