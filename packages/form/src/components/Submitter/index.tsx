import React from 'react';
import { FormInstance } from 'antd/lib/form';
import { Button, Space } from 'antd';
import { useIntl } from '@ant-design/pro-provider';
import { ButtonProps } from 'antd/lib/button';

/**
 * 用于配置操作栏
 */
export interface SearchConfig {
  /**
   * 重置按钮的文本
   */
  resetText?: React.ReactNode;
  /**
   * 提交按钮的文本
   */
  submitText?: React.ReactNode;
}

export interface SubmitterProps {
  form: FormInstance;
  onSubmit?: () => void;
  onReset?: () => void;
  searchConfig?: SearchConfig;
  submitButtonProps?: ButtonProps;
  resetButtonProps?: ButtonProps;

  /**
   * 自定义操作的渲染的渲染
   */
  render?:
    | ((props: SubmitterProps, dom: JSX.Element[]) => React.ReactNode[] | React.ReactNode | false)
    | false;
}

/**
 * FormFooter 的组件，可以自动进行一些配置
 * @param props
 */
const Submitter: React.FC<SubmitterProps> = (props) => {
  const intl = useIntl();
  if (props.render === false) {
    return null;
  }

  const {
    form,
    onSubmit,
    render,
    onReset,
    searchConfig = {},
    submitButtonProps,
    resetButtonProps,
  } = props;

  const {
    submitText = intl.getMessage('tableForm.submit', '提交'),
    resetText = intl.getMessage('tableForm.reset', '重置'),
  } = searchConfig;
  /**
   * 默认的操作的逻辑
   */
  const dom = [
    <Button
      {...resetButtonProps}
      key="rest"
      onClick={(e) => {
        form.resetFields();
        onReset?.();
        resetButtonProps?.onClick?.(e);
      }}
    >
      {resetText}
    </Button>,
    <Button
      {...submitButtonProps}
      key="submit"
      type="primary"
      onClick={(e) => {
        form.submit();
        onSubmit?.();
        submitButtonProps?.onClick?.(e);
      }}
    >
      {submitText}
    </Button>,
  ];

  const renderDom = render ? render(props, dom) : dom;
  if (!renderDom) {
    return null;
  }
  if (Array.isArray(renderDom)) {
    if (renderDom?.length < 1) {
      return null;
    }
    return <Space>{renderDom}</Space>;
  }
  return renderDom as JSX.Element;
};

export default Submitter;
