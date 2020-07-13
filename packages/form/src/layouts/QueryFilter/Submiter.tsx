import React from 'react';
import { FormInstance } from 'antd/es/form';
import { Button, Space } from 'antd';

/**
 * 默认的查询表单配置
 */
const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};

/**
 * 用于配置操作栏
 */
export interface SearchConfig {
  /**
   * 查询按钮的文本
   */
  searchText?: string;
  /**
   * 重置按钮的文本
   */
  resetText?: string;
  span?: number | typeof defaultColConfig;
  /**
   * 收起按钮的 render
   */
  collapseRender?: (
    collapsed: boolean,
    /**
     * 是否应该展示，有两种情况
     * 列只有三列，不需要收起
     * form 模式 不需要收起
     */
    showCollapseButton?: boolean,
  ) => React.ReactNode;
  /**
   * 底部操作栏的 render
   * searchConfig 基础的配置
   * props 更加详细的配置
   * {
      type?: 'form' | 'list' | 'table' | 'cardList' | undefined;
      form: FormInstance;
      submit: () => void;
      collapse: boolean;
      setCollapse: (collapse: boolean) => void;
      showCollapseButton: boolean;
   * }
   */
  optionRender?:
    | ((
        searchConfig: Omit<SearchConfig, 'optionRender'>,
        props: Omit<FormOptionProps, 'searchConfig'>,
      ) => React.ReactNode)
    | false;
  /**
   * 是否收起
   */
  collapsed?: boolean;
  /**
   * 收起按钮的事件
   */
  onCollapse?: (collapsed: boolean) => void;
  /**
   * 提交按钮的文本
   */
  submitText?: string;
}

export interface FormOptionProps {
  form: FormInstance;
  submit: () => void;
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
  showCollapseButton: boolean;
  onReset?: () => void;
  isForm?: boolean;
  searchConfig: SearchConfig;
}

/**
 * FormFooter 的组件，可以自动进行一些配置
 * @param props
 */
const FormOption: React.FC<FormOptionProps> = (props) => {
  const {
    setCollapse,
    collapse,
    form,
    submit,
    showCollapseButton,
    onReset = () => {},
    isForm,
    searchConfig,
  } = props;
  const { searchText, submitText, resetText, collapseRender } = searchConfig;

  return (
    <Space>
      <Button
        onClick={() => {
          form.resetFields();
          onReset();
        }}
      >
        {resetText}
      </Button>{' '}
      <Button type="primary" htmlType="submit" onClick={() => submit()}>
        {isForm ? submitText : searchText}
      </Button>
      {!isForm && showCollapseButton && (
        <a
          onClick={() => {
            setCollapse(!collapse);
          }}
        >
          {collapseRender && collapseRender(collapse)}
        </a>
      )}
    </Space>
  );
};

export default FormOption;
