import React from 'react';
import { Form, Popover, Progress, Space } from 'antd';
import type { FormItemProps } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, LoadingOutlined } from '@ant-design/icons';
import type { Rule, FormInstance, NamePath } from 'rc-field-form/lib/interface';
import type { TooltipPlacement } from 'antd/es/tooltip';

const RED = '#ff4d4f';
const YELLOW = '#faad14';
const GREEN = '#52c41a';
const PRIMARY = '#1890ff';
const colors = { RED, YELLOW, GREEN, PRIMARY };
const getStrokeColor = (percent: number) => {
  if (percent < 30) {
    return colors.RED;
  }
  if (percent < 60) {
    return colors.YELLOW;
  }
  return colors.GREEN;
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
          width: '8px',
          height: '8px',
          borderRadius: '4px',
          backgroundColor: 'rgba(0,0,0,0.45)',
        }}
      ></div>
    </div>
  );
};

const getIcon = (fieldError: string[], value: any, rule: Rule, isTouched: boolean) => {
  if (!value || !isTouched) {
    return <CircleRender></CircleRender>;
  }
  if (fieldError.includes((rule as any).message)) {
    return <CloseCircleFilled style={{ color: colors.RED }} />;
  }
  return <CheckCircleFilled style={{ color: colors.GREEN }} />;
};
const Content = React.memo<{ form: FormInstance; name: NamePath; rules: Rule[] }>(
  function ContentComponent({ form, name, rules }) {
    const fieldError = form.getFieldError(name);
    const value = form.getFieldValue(name);
    const isValidating = form.isFieldValidating(name);
    const isTouched = form.isFieldTouched(name);
    const percent = ((rules.length - fieldError.length) / rules.length) * 100;
    return (
      <div style={{ padding: '6px 8px 12px 8px' }}>
        <Progress
          percent={value && isTouched ? percent : 0}
          strokeColor={getStrokeColor(percent)}
          showInfo={false}
          size="small"
        />
        <ul style={{ margin: 0, marginTop: '10px', listStyle: 'none', padding: '0' }}>
          {rules?.map((rule, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center' }}>
              <Space>
                {isValidating ? (
                  <LoadingOutlined style={{ color: colors.PRIMARY }} />
                ) : (
                  getIcon(fieldError, value, rule, isTouched)
                )}
                <span style={{ color: 'rgba(0,0,0,0.65)' }}>{(rule as any).message}</span>
              </Space>
            </li>
          ))}
        </ul>
      </div>
    );
  },
  (prevProps, nextProps) => {
    const { name } = prevProps;
    if (prevProps.form.getFieldValue(name) === nextProps.form.getFieldValue(name)) {
      return false;
    }
    return true;
  },
);

interface InlineErrorFormItemProps extends FormItemProps {
  errorType?: 'popover' | 'default';
  placement?: TooltipPlacement;
}
const defaultName = 'inline-error-form-item';
const InlineErrorFormItem: React.FC<InlineErrorFormItemProps> = (props) => {
  const { label, rules = [], name = defaultName } = props;
  return (
    <Form.Item shouldUpdate help={''} label={label}>
      {(form) => {
        return (
          <Popover
            trigger={props.trigger}
            placement={props.placement || 'topRight'}
            content={<Content form={form} name={name} rules={rules} />}
          >
            <div>
              <Form.Item
                noStyle
                style={{
                  margin: '-5px 0',
                }}
                preserve={false}
                name={name}
                {...props}
              >
                {props.children}
              </Form.Item>
            </div>
          </Popover>
        );
      }}
    </Form.Item>
  );
};

export default (props: InlineErrorFormItemProps) => {
  if (props.errorType !== 'popover' || !props.rules?.length) {
    // !props.rules && console.error('InlineErrorFormItem should have "rules" props while using errorType="popover"');
    return <Form.Item {...props}>{props.children}</Form.Item>;
  }
  return <InlineErrorFormItem {...props}></InlineErrorFormItem>;
};
