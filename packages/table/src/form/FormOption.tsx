import React from 'react';
import { FormInstance } from 'antd/es/form';
import { Button, Space } from 'antd';
import { ProTableTypes } from '../Table';
import { SearchConfig } from './index';

export interface FormOptionProps {
  searchConfig: SearchConfig;
  type?: ProTableTypes;
  form: FormInstance;
  submit: () => void;
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
  showCollapseButton: boolean;
  onReset?: () => void;
}

/**
 * FormFooter 的组件，可以自动进行一些配置
 * @param props
 */
const FormOption: React.FC<FormOptionProps> = (props) => {
  const {
    searchConfig,
    setCollapse,
    collapse,
    type,
    form,
    submit,
    showCollapseButton,
    onReset = () => {},
  } = props;
  const isForm = type === 'form';
  const { searchText, submitText, resetText, collapseRender, optionRender } = searchConfig;
  if (optionRender === false) {
    return null;
  }
  if (optionRender) {
    return <>{optionRender(searchConfig, props)}</>;
  }
  return (
    <Space>
      <Button
        onClick={() => {
          form.resetFields();
          onReset();
          if (!isForm) {
            submit();
          }
        }}
      >
        {resetText}
      </Button>
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
