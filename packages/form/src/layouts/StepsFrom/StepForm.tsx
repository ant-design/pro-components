import React, { useContext } from 'react';
import { FormProps } from 'antd/lib/form/Form';
import BaseForm, { CommonFormProps } from '../../BaseForm';
import { StepsFormProvide } from './index';
import { Button } from 'antd';

export interface StepFormProps extends FormProps, CommonFormProps {
  // ProForm 基础表单，暂无特殊属性
  index?: number;
}

const StepForm: React.FC<StepFormProps> = (props) => {
  const context = useContext(StepsFormProvide);
  const next = (
    <Button
      key="next"
      type="primary"
      onClick={() => {
        context?.next();
      }}
    >
      下一步
    </Button>
  );
  const pre = (
    <Button
      key="pre"
      onClick={() => {
        context?.pre();
      }}
    >
      上一步
    </Button>
  );

  const submit = (
    <Button key="submit" onClick={() => {}}>
      提交
    </Button>
  );

  return (
    <BaseForm
      layout="vertical"
      submitter={{
        // 反转按钮，在正常模式下，按钮应该是主按钮在前
        render: (_, dom) => {
          const index = props?.index || 0;
          if (index < 1) {
            return [next];
          }
          if (index + 1 === context?.keyArray.length) {
            return [pre, submit];
          }
          return [pre, next];
        },
      }}
      contentRender={(items, submitter) => {
        return (
          <>
            {items}
            {submitter}
          </>
        );
      }}
      {...props}
    />
  );
};

export default StepForm;
