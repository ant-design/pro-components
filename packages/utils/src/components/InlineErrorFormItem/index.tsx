import React, { useState, useContext } from 'react';
import { Form, Popover, Progress, Space, ConfigProvider } from 'antd';
import classNames from 'classnames';
import type { FormItemProps, PopoverProps, ProgressProps } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, LoadingOutlined } from '@ant-design/icons';
import type { Rule, NamePath, RuleObject, FormInstance } from 'rc-field-form/lib/interface';
import './index.less';

const getStrokeColor = (percent: number) => {
  if (percent < 50) {
    return 'error';
  }
  if (percent < 100) {
    return 'warning';
  }
  return 'success';
};

const CircleRender = ({ prefixCls }: { prefixCls: string }) => {
  return (
    <div className={`${prefixCls}-rule-content-icon-default`}>
      <div className={`${prefixCls}-rule-content-icon-default-circle`} />
    </div>
  );
};

const getIcon = (
  fieldError: string[],
  rule: Rule,
  isTouched: boolean,
  requiredChecked: boolean,
  isValidating: boolean,
  prefixCls: string,
) => {
  if (isValidating) {
    return <LoadingOutlined className={`${prefixCls}-rule-content-icon-loading`} />;
  }
  if (!isTouched) {
    return <CircleRender prefixCls={prefixCls}></CircleRender>;
  }
  if (!requiredChecked || fieldError.includes((rule as any).message)) {
    return <CloseCircleFilled className={`${prefixCls}-rule-content-icon-error`} />;
  }
  return <CheckCircleFilled className={`${prefixCls}-rule-content-icon-success`} />;
};

const Content: React.FC<{
  fieldError: string[];
  value: any;
  isValidating: boolean;
  isTouched: boolean;
  rules: FormItemProps['rules'];
  progressProps?: ProgressProps | false;
  form: Omit<FormInstance, 'scrollToField' | '__INTERNAL__' | 'getFieldInstance'>;
}> = ({ rules = [], isTouched, isValidating, value, fieldError, progressProps, form }) => {
  const percent = Math.max(
    0,
    Math.min(100, ((rules.length - fieldError.length) / rules.length) * 100),
  );
  const isMultipleRule = rules.length > 1;
  const requiredRule = rules.find((_) => (_ as RuleObject).required) as RuleObject;
  const hasRequired = !!requiredRule;
  const requiredChecked = hasRequired && !fieldError.includes(requiredRule?.message as string);

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-inline-error-form-item');

  return (
    <div className={classNames(prefixCls, { [`${prefixCls}-multiple`]: isMultipleRule })}>
      <Space direction="vertical">
        {(progressProps === undefined || progressProps) && (
          <Progress
            className={`${prefixCls}-progress-${getStrokeColor(percent)}`}
            percent={value && isTouched ? percent : 0}
            showInfo={false}
            size="small"
            strokeLinecap={'butt'}
            {...progressProps}
          />
        )}
        <ul className={`${prefixCls}-rule`}>
          {rules?.map((item, idx) => {
            const rule = typeof item === 'function' ? item(form) : item;
            return (
              <li key={idx} className={`${prefixCls}-rule-content`}>
                <Space>
                  {getIcon(
                    fieldError,
                    rule,
                    isTouched,
                    hasRequired ? requiredChecked : true,
                    isValidating,
                    prefixCls,
                  )}
                  <span className={`${prefixCls}-rule-content-text`}>{rule.message}</span>
                </Space>
              </li>
            );
          })}
        </ul>
      </Space>
    </div>
  );
};

interface InlineErrorFormItemProps extends FormItemProps {
  errorType?: 'popover' | 'default';
  popoverProps?: PopoverProps;
  progressProps?: ProgressProps | false;
}

interface InternalProps extends InlineErrorFormItemProps {
  name: NamePath;
  rules: FormItemProps['rules'];
}

const FIX_INLINE_STYLE = {
  marginTop: -5,
  marginBottom: -5,
  marginLeft: 0,
  marginRight: 0,
};

const InternalFormItem: React.FC<
  InternalProps & {
    form: Omit<FormInstance, 'scrollToField' | '__INTERNAL__' | 'getFieldInstance'>;
  }
> = ({ label, rules, name, children, popoverProps, progressProps, form, ...rest }) => {
  const fieldError = form.getFieldError(name);
  const value = form.getFieldValue(name);
  const isValidating = form.isFieldValidating(name);
  const isTouched = form.isFieldTouched(name);

  const [visible, setVisible] = useState<boolean | undefined>(undefined);

  return (
    <Form.Item
      style={FIX_INLINE_STYLE}
      preserve={false}
      name={name}
      validateFirst={false}
      rules={rules}
      // @ts-ignore
      _internalItemRender={{
        mark: 'pro_table_render',
        render: (
          inputProps: FormItemProps & {
            errors: any[];
          },
          {
            input,
            extra,
          }: {
            input: JSX.Element;
            errorList: JSX.Element;
            extra: JSX.Element;
          },
        ) => {
          return (
            <Popover
              trigger={popoverProps?.trigger || 'focus'}
              placement={popoverProps?.placement}
              visible={visible}
              onVisibleChange={setVisible}
              content={
                <Content
                  fieldError={fieldError}
                  value={value}
                  isValidating={isValidating}
                  isTouched={isTouched}
                  rules={rules}
                  progressProps={progressProps}
                  form={form}
                />
              }
            >
              <div>
                {input}
                {extra}
              </div>
            </Popover>
          );
        },
      }}
      {...rest}
    >
      {children}
    </Form.Item>
  );
};

const InlineErrorFormItem: React.FC<InternalProps> = (props) => {
  return (
    <Form.Item shouldUpdate={true} noStyle>
      {(form) => {
        return <InternalFormItem {...props} form={form as FormInstance} />;
      }}
    </Form.Item>
  );
};

export default (props: InlineErrorFormItemProps) => {
  const { errorType, rules, name, popoverProps, children, progressProps, ...rest } = props;
  if (name && rules?.length && errorType === 'popover') {
    return (
      <InlineErrorFormItem
        name={name}
        rules={rules!}
        popoverProps={popoverProps}
        progressProps={rules.length > 1 ? progressProps : false}
        {...rest}
      >
        {children}
      </InlineErrorFormItem>
    );
  }
  return (
    <Form.Item rules={rules} {...rest} style={{ ...FIX_INLINE_STYLE, ...rest.style }} name={name}>
      {children}
    </Form.Item>
  );
};
