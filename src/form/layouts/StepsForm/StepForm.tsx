import { omit, warning } from '@rc-component/util';
import type { FormInstance, FormProps } from 'antd';
import type { StepProps } from 'rc-steps/es/Step';
import { useContext, useEffect, useImperativeHandle, useRef } from 'react';
import type { CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import type { StepsFormProps } from './index';
import { StepFormProvide, StepsFormProvide } from './index';

const { noteOnce } = warning;

export type StepFormProps<T = Record<string, any>, U = Record<string, any>> = {
  step?: number;
  stepProps?: StepProps;
  index?: number;
} & Omit<FormProps<T>, 'onFinish' | 'form'> &
  Omit<CommonFormProps<T, U>, 'submitter' | 'form'>;

function StepForm<T = Record<string, any>>(stepNativeProps: StepFormProps<T>) {
  const formRef = useRef<FormInstance>(undefined);
  const context = useContext(StepsFormProvide);
  const stepContext = useContext(StepFormProvide);

  const props = { ...stepNativeProps, ...stepContext } as StepFormProps<T> & StepsFormProps<any>;
  const { onFinish, step, formRef: propFormRef, title, stepProps, ...restProps } = props;

  noteOnce(!restProps.submitter, 'StepForm 不包含提交按钮，请在 StepsForm 上');

  /** 重置 formRef */
  useImperativeHandle(propFormRef, () => formRef.current, [propFormRef?.current]);

  /** Dom 不存在的时候解除挂载 */
  useEffect(() => {
    if (!(props.name || props.step)) return;
    const name = (props.name || props.step)!.toString();
    context?.regForm(name, props);
    return () => {
      context?.unRegForm(name);
    };
  }, []);

  if (context && context?.formArrayRef) {
    context.formArrayRef.current[step || 0] = formRef;
  }

  return (
    <BaseForm<T>
      formRef={formRef}
      layout="vertical"
      onFinish={async (values) => {
        if (restProps.name) {
          context?.onFormFinish(restProps.name, values);
        }
        if (onFinish) {
          context?.setLoading(true);
          try {
            // 如果报错，直接抛出
            const success = await onFinish?.(values);

            if (success) {
              context?.next();
            }
          } finally {
            context?.setLoading(false);
          }
          return;
        }

        if (!context?.lastStep) context?.next();
      }}
      onInit={(_, form) => {
        formRef.current = form;
        if (context && context?.formArrayRef) {
          context.formArrayRef.current[step || 0] = formRef;
        }
        restProps?.onInit?.(_, form);
      }}
      {...omit(restProps, ['layoutType', 'columns'] as any[])}
    />
  );
}

export default StepForm;
