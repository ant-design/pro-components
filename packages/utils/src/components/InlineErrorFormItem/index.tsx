import React, { useState, useEffect, useContext } from 'react';
import { Form, Popover, ConfigProvider } from 'antd';
import type { FormItemProps, PopoverProps } from 'antd';
import type { NamePath } from 'rc-field-form/lib/interface';
import './index.less';
import { LoadingOutlined } from '@ant-design/icons';

interface InlineErrorFormItemProps extends FormItemProps {
  errorType?: 'popover' | 'default';
  popoverProps?: PopoverProps;
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

const InlineErrorFormItem: React.FC<{
  inputProps: any;
  input: JSX.Element;
  errorList: JSX.Element;
  extra: JSX.Element;
  popoverProps?: PopoverProps;
}> = ({ inputProps, input, extra, errorList, popoverProps }) => {
  const [visible, setVisible] = useState<boolean | undefined>(false);
  const [errorStringList, setErrorList] = useState<string[]>([]);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  useEffect(() => {
    if (inputProps.validateStatus !== 'validating') {
      setErrorList(inputProps.errors);
    }
  }, [inputProps.errors, inputProps.validateStatus]);

  const prefixCls = getPrefixCls();

  return (
    <Popover
      key="popover"
      trigger={popoverProps?.trigger || 'focus'}
      placement={popoverProps?.placement || 'topRight'}
      visible={errorStringList.length < 1 ? false : visible}
      onVisibleChange={(visibleParams) => {
        if (visibleParams === visible) return;
        setVisible(visibleParams);
      }}
      getPopupContainer={popoverProps?.getPopupContainer}
      getTooltipContainer={popoverProps?.getTooltipContainer}
      content={
        <div className={`${prefixCls}-form-item-with-help`}>
          {inputProps.validateStatus === 'validating' ? <LoadingOutlined /> : null}
          {errorList}
        </div>
      }
    >
      <div>
        {input}
        {extra}
      </div>
    </Popover>
  );
};

const InternalFormItem: React.FC<InternalProps> = ({
  label,
  rules,
  name,
  children,
  popoverProps,
  ...rest
}) => {
  return (
    <Form.Item
      preserve={false}
      name={name}
      rules={rules}
      hasFeedback
      // @ts-ignore
      _internalItemRender={{
        mark: 'pro_table_render',
        render: (
          inputProps: FormItemProps & {
            errors: any[];
          },
          doms: {
            input: JSX.Element;
            errorList: JSX.Element;
            extra: JSX.Element;
          },
        ) => <InlineErrorFormItem inputProps={inputProps} popoverProps={popoverProps} {...doms} />,
      }}
      {...rest}
      style={{
        ...FIX_INLINE_STYLE,
        ...rest?.style,
      }}
    >
      {children}
    </Form.Item>
  );
};

export default (props: InlineErrorFormItemProps) => {
  const { errorType, rules, name, popoverProps, children, ...rest } = props;

  if (name && rules?.length && errorType === 'popover') {
    return (
      <InternalFormItem name={name} rules={rules!} popoverProps={popoverProps} {...rest}>
        {children}
      </InternalFormItem>
    );
  }
  return (
    <Form.Item rules={rules} {...rest} style={{ ...FIX_INLINE_STYLE, ...rest.style }} name={name}>
      {children}
    </Form.Item>
  );
};
