import React from 'react';
import { FormInstance } from 'antd/es/form';
import { Button, Space } from 'antd';

/**
 * 用于配置操作栏
 */
export interface SearchConfig {
  /**
   * 重置按钮的文本
   */
  resetText?: string;
  /**
   * 提交按钮的文本
   */
  submitText?: string;
}

export interface SubmiterProps {
  form: FormInstance;
  onSubmit?: () => void;
  onReset?: () => void;
  searchConfig?: SearchConfig;
}

/**
 * FormFooter 的组件，可以自动进行一些配置
 * @param props
 */
const Submiter: React.FC<SubmiterProps> = (props) => {
  const {
    form,
    onSubmit = () => {},
    onReset = () => {},
    searchConfig = {},
  } = props;
  // TODO i18n
  const { submitText = '提交', resetText = '重置' } = searchConfig;

  return (
    <Space>
      <Button
        onClick={() => {
          form.resetFields();
          onReset();
        }}
      >
        {resetText}
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => {
          onSubmit();
        }}
      >
        {submitText}
      </Button>
    </Space>
  );
};

export default Submiter;
