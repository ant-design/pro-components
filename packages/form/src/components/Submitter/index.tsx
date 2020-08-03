import React from 'react';
import { FormInstance } from 'antd/es/form';
import { Button, Space } from 'antd';
import { useIntl } from '@ant-design/pro-provider';

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

export interface SubmitterProps {
  form: FormInstance;
  onSubmit?: () => void;
  onReset?: () => void;
  searchConfig?: SearchConfig;
}

/**
 * FormFooter 的组件，可以自动进行一些配置
 * @param props
 */
const Submitter: React.FC<SubmitterProps> = (props) => {
  const { form, onSubmit = () => {}, onReset = () => {}, searchConfig = {} } = props;
  const intl = useIntl();
  const {
    submitText = intl.getMessage('tableForm.submit', '提交'),
    resetText = intl.getMessage('tableForm.reset', '重置'),
  } = searchConfig;

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

export default Submitter;
