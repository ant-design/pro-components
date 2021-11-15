import React, { useContext, useRef, useEffect, useImperativeHandle } from 'react';
import type { FormProps, FormInstance, StepProps } from 'antd';
import { noteOnce } from 'rc-util/lib/warning';

import type { CommonFormProps } from '../../BaseForm';
import BaseForm from '../../BaseForm';
import { StepsFormProvide } from './index';

export type StepFormProps<T = Record<string, any>> = {
  step?: number;
  stepProps?: StepProps;
} & Omit<FormProps<T>, 'onFinish'> &
  Omit<CommonFormProps<T>, 'submitter'>;

function StepForm<T = Record<string, any>>({
  onFinish,
  step,
  formRef: propFormRef,
  title,
  stepProps,
  ...restProps
}: StepFormProps<T>) {
  const formRef = useRef<FormInstance | undefined>();
  const context = useContext(StepsFormProvide);

  // eslint-disable-next-line @typescript-eslint/dot-notation
  noteOnce(!restProps['submitter'], 'StepForm 不包含提交按钮，请在 StepsForm 上');
  /** 重置 formRef */
  useImperativeHandle(propFormRef, () => formRef.current);

  /** Dom 不存在的时候解除挂载 */
  useEffect(() => {
    return () => {
      if (restProps.name) {
        context?.unRegForm(restProps.name);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
}

export default StepForm;
