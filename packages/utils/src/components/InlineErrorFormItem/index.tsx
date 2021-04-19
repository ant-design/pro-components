import React from 'react';
import { Form, Popover, Progress, Space } from 'antd';
import type { FormItemProps, PopoverProps, ProgressProps } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, LoadingOutlined } from '@ant-design/icons';
import type { Rule, NamePath, RuleObject } from 'rc-field-form/lib/interface';

const RED = '#ff4d4f';
const YELLOW = '#faad14';
const GREEN = '#52c41a';
const PRIMARY = '#1890ff';
const COLORS = { RED, YELLOW, GREEN, PRIMARY };

const getStrokeColor = (percent: number) => {
  if (percent < 50) {
    return COLORS.RED;
  }
  if (percent < 100) {
    return COLORS.YELLOW;
  }
  return COLORS.GREEN;
};

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
      <div
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '4px',
          backgroundColor: 'rgba(0,0,0,0.45)',
        }}
      />
    </div>
  );
};

const getIcon = (
  fieldError: string[],
  rule: Rule,
  isTouched: boolean,
  requiredChecked: boolean,
) => {
  if (!isTouched) {
    return <CircleRender></CircleRender>;
  }
  if (!requiredChecked) {
    return <CloseCircleFilled style={{ color: COLORS.RED }} />;
  }
  if (fieldError.includes((rule as any).message)) {
    return <CloseCircleFilled style={{ color: COLORS.RED }} />;
  }
  return <CheckCircleFilled style={{ color: COLORS.GREEN }} />;
};

const Content: React.FC<{
  fieldError: string[];
  value: any;
  isValidating: boolean;
  isTouched: boolean;
  rules: Rule[];
  progressProps?: ProgressProps | false;
}> = ({ rules, isTouched, isValidating, value, fieldError, progressProps }) => {
  const percent = Math.max(
    0,
    Math.min(100, ((rules.length - fieldError.length) / rules.length) * 100),
  );
  const isSingleRule = rules.length === 1;
  const requiredRule = rules.filter((_) => (_ as RuleObject).required)[0] as RuleObject;
  const hasRequired = !!requiredRule;
  const requiredChecked = hasRequired && !fieldError.includes(requiredRule?.message as string);
  return (
    <div style={isSingleRule ? {} : { padding: '6px 8px 12px 8px' }}>
      {(progressProps === undefined || progressProps) && (
        <Progress
          percent={value && isTouched ? percent : 0}
          strokeColor={getStrokeColor(percent)}
          showInfo={false}
          size="small"
          strokeLinecap={'butt'}
          {...progressProps}
        />
      )}
      <ul
        style={
          isSingleRule
            ? { margin: 0, padding: 0, listStyle: 'none' }
            : { margin: 0, marginTop: '10px', listStyle: 'none', padding: '0' }
        }
      >
        {rules?.map((rule, idx) => (
          <li key={idx} style={{ display: 'flex', alignItems: 'center' }}>
            <Space>
              {isValidating ? (
                <LoadingOutlined style={{ color: COLORS.PRIMARY }} />
              ) : (
                getIcon(fieldError, rule, isTouched, hasRequired ? requiredChecked : true)
              )}
              <span style={{ color: 'rgba(0,0,0,0.65)' }}>{(rule as any).message}</span>
            </Space>
          </li>
        ))}
      </ul>
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
  rules: Rule[];
}

const FIX_INLINE_STYLE = {
  marginTop: -5,
  marginBottom: -5,
  marginLeft: 0,
  marginRight: 0,
};

const InlineErrorFormItem: React.FC<InternalProps> = ({
  label,
  rules,
  name,
  children,
  popoverProps,
  progressProps,
  ...rest
}) => {
  let isPrevError = true;
  let isDoneFirstValidate = false;
  return (
    <Form.Item shouldUpdate={true} noStyle>
      {(form) => {
        const fieldError = form.getFieldError(name);
        const value = form.getFieldValue(name);
        const isValidating = form.isFieldValidating(name);
        const isTouched = form.isFieldTouched(name);
        if (!isValidating) {
          if (isDoneFirstValidate) {
            isPrevError = !!fieldError.length;
          }
        } else {
          isDoneFirstValidate = true;
        }

        const getVisible = () => {
          if (isTouched) {
            if (isValidating) {
              return isPrevError;
            }
            return !!fieldError.length;
          }
          return undefined;
        };

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
                    visible={getVisible()}
                    content={
                      <Content
                        fieldError={fieldError}
                        value={value}
                        isValidating={isValidating}
                        isTouched={isTouched}
                        rules={rules}
                        progressProps={progressProps}
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
