import type { FC } from 'react';
import React from 'react';
import { Popover, Input, Progress, Space, Form } from 'antd';
import type { FormItemProps } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, LoadingOutlined } from '@ant-design/icons';
import type { Rule, FormInstance } from 'rc-field-form/lib/interface';
import ProForm from '../layouts/ProForm';

const Circle = (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>圆点</title>
    <g id="A-登录" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="*A1-1-注册-创建账户" transform="translate(-483.000000, -1429.000000)">
        <g id="设计说明" transform="translate(59.925000, 990.000000)">
          <g id="Group-4-Copy" transform="translate(401.075000, 326.000000)">
            <g id="Group" transform="translate(22.000000, 113.000000)">
              <rect id="矩形备份" x="0" y="0" width="16" height="16"></rect>
              <circle id="Oval" fillOpacity="0.45" fill="#000000" cx="8" cy="8" r="3"></circle>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const RED = '#ff4d4f';
const YELLOW = '#faad14';
const GREEN = '#52c41a';
const colors = { RED, YELLOW, GREEN };

const CircleRender = () => {
  return (
    <div
      style={{
        width: 14,
        height: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {Circle}
    </div>
  );
};

interface Props extends FormItemProps {
  rules: Rule[];
  label: string;
  name: string;
}

const PasswordStrengthCalculator: FC<Props> = ({ rules, name, label, ...rest }) => {
  const getStrokeColor = (percent: number) => {
    if (percent < 30) {
      return colors.RED;
    }
    if (percent < 60) {
      return colors.YELLOW;
    }
    return colors.GREEN;
  };

  const getIcon = (fieldError: string[], value: any, rule: Rule) => {
    if (!value) {
      return <CircleRender></CircleRender>;
    }
    if (fieldError.includes((rule as any).message)) {
      return <CloseCircleFilled style={{ color: colors.RED }} />;
    }
    return <CheckCircleFilled style={{ color: colors.GREEN }} />;
  };

  const getContent = (form: FormInstance) => {
    const fieldError = form.getFieldError(name);
    const value = form.getFieldValue(name);
    const isValidating = form.isFieldValidating(name);
    const percent = ((rules.length - fieldError.length) / rules.length) * 100;
    return (
      <div style={{ padding: '6px 8px 12px 8px' }}>
        <Progress
          percent={value ? percent : 0}
          strokeColor={getStrokeColor(percent)}
          showInfo={false}
          size="small"
        />
        <ul style={{ margin: 0, marginTop: '10px', listStyle: 'none', padding: '0' }}>
          {rules?.map((rule, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center' }}>
              <Space>
                {isValidating ? <LoadingOutlined /> : getIcon(fieldError, value, rule)}
                <span style={{ color: 'rgba(0,0,0,0.65)' }}>{(rule as any).message}</span>
              </Space>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <Form.Item label={label} shouldUpdate>
        {(form) => {
          return (
            <Popover content={getContent(form)} trigger="focus" placement="rightTop">
              <div>
                <Form.Item name={name} noStyle rules={rules} {...rest}>
                  <Input.Password
                    width="md"
                    placeholder="请输入"
                    autoComplete="off"
                    formNoValidate
                  />
                </Form.Item>
              </div>
            </Popover>
          );
        }}
      </Form.Item>
    </>
  );
};

export default () => {
  const defaultRules: Rule[] = [
    {
      type: 'string',
      min: 12,
      message: '至少12个字符',
    },
    {
      type: 'string',
      pattern: /[a-z]+[A-Z]+/,
      message: '包含小写字母(a-z)和大写字母(A-Z)',
    },
    {
      type: 'string',
      pattern: /([0-9]|[$@$!%*#?&])+/,
      message: '至少包含一个数字(0-9)或是一个符号',
    },
    {
      validator: (rule, value) => {
        if (value.includes('example@antgroup.com') || value.includes('example')) {
          return Promise.reject(new Error('不包含您的姓名或电子邮件地址'));
        }
        return Promise.resolve();
      },
      message: '不包含您的姓名或电子邮件地址',
    },
  ];
  return (
    <ProForm
      layout="horizontal"
      style={{
        width: 500,
        margin: 100,
      }}
    >
      <PasswordStrengthCalculator
        label="password"
        name="password"
        rules={defaultRules}
      ></PasswordStrengthCalculator>
    </ProForm>
  );
};
