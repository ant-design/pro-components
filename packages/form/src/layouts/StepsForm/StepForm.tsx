import React, { useContext, useRef, useEffect } from 'react';
import { FormProps, FormInstance } from 'antd/lib/form/Form';

import BaseForm, { CommonFormProps } from '../../BaseForm';
import { StepsFormProvide } from './index';

export interface StepFormProps
  extends Omit<FormProps, 'onFinish'>,
    Omit<CommonFormProps, 'submitter'> {
  step?: number;
}

const StepForm: React.FC<StepFormProps> = ({ onFinish, step, ...restProps }) => {
  const formRef = useRef<FormInstance | undefined>();
  const context = useContext(StepsFormProvide);

  /**
   * dom 不存在的时候解除挂载
   */
  useEffect(() => {
    return () => {
      if (restProps.name) {
        context?.unRegForm(restProps.name);
      }
    };
  }, []);

  if (context && context?.formArrayRef) {
    context.formArrayRef.current[step || 0] = formRef;
  }

  return (
    <BaseForm
      formRef={formRef}
      onFinish={async (values) => {
        if (restProps.name) {
          context?.onFormFinish(restProps.name, values);
        }
        if (onFinish) {
          context?.setLoading(true);
          // 如果报错，直接抛出
          const success = await onFinish?.(values);
          if (success) {
            context?.next();
          }
          context?.setLoading(false);
          return;
        }
        context?.next();
      }}
      layout="vertical"
      {...restProps}
    />
  );
};

export default StepForm;
