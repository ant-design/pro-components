import React from 'react';
import type { FormInstance } from 'antd/lib/form';
import { Button, Space } from 'antd';
import { useIntl } from '@ant-design/pro-provider';
import type { ButtonProps } from 'antd/lib/button';

/** @name 用于配置操作栏 */
export type SearchConfig = {
  /** @name 重置按钮的文本 */
  resetText?: React.ReactNode;
  /** @name 提交按钮的文本 */
  submitText?: React.ReactNode;
};

export type SubmitterProps<T = {}> = {
  /** @name 提交方法 */
  onSubmit?: () => void;
  /** @name 重置方法 */
  onReset?: () => void;
  /** @name 搜索的配置，一般用来配置文本 */
  searchConfig?: SearchConfig;
  /** @name 提交按钮的 props */
  submitButtonProps?: ButtonProps;
  /** @name 重置按钮的 props */
  resetButtonProps?: ButtonProps;
  /** @name 自定义操作的渲染 */
  render?:
    | ((
        props: SubmitterProps &
          T & {
            submit: () => void;
            reset: () => void;
          },
        dom: JSX.Element[],
      ) => React.ReactNode[] | React.ReactNode | false)
    | false;
};

/**
 * FormFooter 的组件，可以自动进行一些配置
 *
 * @param props
 */

const Submitter: React.FC<SubmitterProps & { form: FormInstance }> = (props) => {
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

  const submit = () => {
    form.resetFields();
    onReset?.();
  };

  const reset = () => {
    form.resetFields();
    onReset?.();
  };

  const {
    submitText = intl.getMessage('tableForm.submit', '提交'),
    resetText = intl.getMessage('tableForm.reset', '重置'),
  } = searchConfig;
  /** 默认的操作的逻辑 */
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
      type="primary"
      {...submitButtonProps}
      key="submit"
      onClick={(e) => {
        form.submit();
        onSubmit?.();
        submitButtonProps?.onClick?.(e);
      }}
    >
      {submitText}
    </Button>,
  ];

  const renderDom = render ? render({ ...props, submit, reset }, dom) : dom;
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
