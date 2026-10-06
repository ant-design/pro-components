import { omit, warning } from '@rc-component/util';
import type { FormInstance, FormProps, StepsProps } from 'antd';
import { useContext, useEffect, useImperativeHandle, useRef } from 'react';
import type { CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import { StepFormProvide, StepsFormProvide } from './index';
import type { StepsFormProps } from './index';
const { noteOnce } = warning;

export type StepFormProps<T = Record<string, any>, U = Record<string, any>> = {
  step?: number;
  stepProps?: NonNullable<StepsProps['items']>[number];
  index?: number;
  // #9101 支持传入 Form.useForm() 实例（运行时经 restProps 透传给 BaseForm），
  // 共享实例时非当前步字段通过 skipFieldRules 跳过校验
} & Omit<FormProps<T>, 'onFinish'> &
  Omit<CommonFormProps<T, U>, 'submitter' | 'form'>;

function StepForm<T = Record<string, any>>(stepNativeProps: StepFormProps<T>) {
  const formRef = useRef<FormInstance | undefined>();
  const context = useContext(StepsFormProvide);
  const stepContext = useContext(StepFormProvide);

  /**
   * #9021:StepsForm 会把外层 item 的 props(含 children)放进
   * StepFormProvide context。当 StepForm 被自定义组件包裹时,
   * context 里的 children 是包装组件从外层接收的,
   * 若 context 覆盖元素自身 props,内部显式声明的渲染逻辑会被覆盖。
   * 只让元素自身书写的 children 优先，其余上下文属性（尤其是计算后的 step）
   * 仍由 StepsForm 控制。
   */
  const props = {
    ...stepNativeProps,
    ...stepContext,
    children: stepNativeProps.children ?? stepContext?.children,
  } as StepFormProps<T> & StepsFormProps<any>;
  const {
    onFinish,
    step,
    formRef: propFormRef,
    title: _title,
    stepProps: _stepProps,
    ...restProps
  } = props;

  noteOnce(!restProps.submitter, 'StepForm 不包含提交按钮，请在 StepsForm 上');

  /** 重置 formRef */
  useImperativeHandle(propFormRef, () => formRef.current, [
    propFormRef?.current,
  ]);

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
      // 非当前步的字段跳过 rules（#9101）：共享 form 实例时
      // submit 会校验整个 store，隐藏步骤的必填项会阻塞当前步提交
      skipFieldRules={context ? context.current !== (step ?? 0) : false}
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
        // #8108:通知 StepsForm 实例已初始化,刷新外层 formRef 的 imperative handle
        context?.onFormInit?.();
        restProps?.onInit?.(_, form);
      }}
      layout="vertical"
      {...omit(restProps, ['layoutType', 'columns'] as any[])}
    />
  );
}

export default StepForm;
