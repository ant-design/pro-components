import React, { useContext, useRef, useState, useEffect } from 'react';
import { FormProps, FormInstance } from 'antd/lib/form/Form';
import { Button } from 'antd';

import BaseForm, { CommonFormProps } from '../../BaseForm';
import { StepsFormProvide } from './index';

export interface StepFormProps<T = any> extends FormProps, CommonFormProps {
  // ProForm 基础表单，暂无特殊属性
  step?: number;
  onFinish?: (values: T) => Promise<boolean>;
}

const StepForm: React.FC<StepFormProps> = ({ onFinish, step, ...restProps }) => {
  const formRef = useRef<FormInstance | undefined>();
  const context = useContext(StepsFormProvide);
  const [loading, setLoading] = useState(false);
  const next = (
    <Button
      key="next"
      type="primary"
      loading={loading}
      onClick={async () => {
        formRef.current?.submit();
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
    <Button
      key="submit"
      type="primary"
      onClick={async () => {
        formRef.current?.submit();
      }}
    >
      提交
    </Button>
  );

  /**
   * dom 不存在的时候接触挂载
   */
  useEffect(() => {
    return () => {
      if (restProps.name) {
        context?.unRegForm(restProps.name);
      }
    };
  }, []);

  return (
    <BaseForm
      formRef={formRef}
      onFinish={async (values) => {
        if (restProps.name) {
          context?.onFormFinish(restProps.name, values);
        }

        if (onFinish) {
          setLoading(true);
          try {
            const success = await onFinish?.(values);
            if (success) {
              context?.next();
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
          setLoading(false);
          return;
        }
        context?.next();
      }}
      layout="vertical"
      submitter={{
        // 反转按钮，在正常模式下，按钮应该是主按钮在前
        render: () => {
          const index = step || 0;
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
      {...restProps}
    />
  );
};

export default StepForm;
