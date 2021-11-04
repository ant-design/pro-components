import React, { useRef, useCallback, useEffect, useContext, useImperativeHandle } from 'react';
import type { StepsProps, FormInstance } from 'antd';
import { Form, Steps, ConfigProvider, Button, Space } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import type { FormProviderProps } from 'antd/lib/form/context';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import classNames from 'classnames';
import { ConfigProviderWrap, useIntl } from '@ant-design/pro-provider';
import { useMountMergeState, merge } from '@ant-design/pro-utils';

import type { StepFormProps } from './StepForm';
import StepForm from './StepForm';
import './index.less';
import type { ProFormProps } from '../ProForm';
import type { SubmitterProps } from '../../components/Submitter';

type StepsFormProps<T = Record<string, any>> = {
  /**
   * 返回 true 会重置步数，并且清空表单
   *
   * @name 提交方法
   */
  onFinish?: (values: T) => Promise<boolean | void>;
  current?: number;
  stepsProps?: StepsProps;
  formProps?: ProFormProps<T>;
  onCurrentChange?: (current: number) => void;
  /** 自定义步骤器 */
  stepsRender?: (
    steps: {
      key: string;
      title?: React.ReactNode;
    }[],
    defaultDom: React.ReactNode,
  ) => React.ReactNode;
  /** @name 当前展示表单的 formRef */
  formRef?: React.MutableRefObject<FormInstance<any> | undefined>;
  /** @name 所有表单的 formMapRef */
  formMapRef?: React.MutableRefObject<React.MutableRefObject<FormInstance<any> | undefined>[]>;
  /**
   * 自定义单个表单
   *
   * @param form From 的 dom，可以放置到别的位置
   */
  stepFormRender?: (from: React.ReactNode) => React.ReactNode;

  /**
   * 自定义整个表单区域
   *
   * @param form From 的 dom，可以放置到别的位置
   * @param submitter 操作按钮
   */
  stepsFormRender?: (from: React.ReactNode, submitter: React.ReactNode) => React.ReactNode;
  /** 按钮的统一配置，优先级低于分步表单的配置 */
  submitter?:
    | SubmitterProps<{
        step: number;
        onPre: () => void;
        form?: FormInstance<any>;
      }>
    | false;

  containerStyle?: React.CSSProperties;
} & FormProviderProps;

export const StepsFormProvide = React.createContext<
  | {
      unRegForm: (name: string) => void;
      onFormFinish: (name: string, formData: any) => void;
      keyArray: string[];
      formArrayRef: React.MutableRefObject<React.MutableRefObject<FormInstance<any> | undefined>[]>;
      loading: boolean;
      setLoading: (loading: boolean) => void;
      formMapRef: React.MutableRefObject<Map<string, StepFormProps>>;
      next: () => void;
    }
  | undefined
>(undefined);
function StepsForm<T = Record<string, any>>(
  props: StepsFormProps<T> & {
    children: any;
  },
) {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-steps-form');

  const {
    current,
    onCurrentChange,
    submitter,
    stepsFormRender,
    stepsRender,
    stepFormRender,
    stepsProps,
    onFinish,
    formProps,
    containerStyle,
    formRef,
    formMapRef: propsFormMapRef,
    ...rest
  } = props;
  const formDataRef = useRef(new Map<string, Record<string, any>>());
  const formMapRef = useRef(new Map<string, StepFormProps>());
  const formArrayRef = useRef<React.MutableRefObject<FormInstance<any> | undefined>[]>([]);
  const [formArray, setFormArray] = useMountMergeState<string[]>([]);
  const [loading, setLoading] = useMountMergeState<boolean>(false);
  const intl = useIntl();

  /** 受控的方式来操作表单 */
  const [step, setStep] = useMergedState<number>(0, {
    value: props.current,
    onChange: props.onCurrentChange,
  });

  /** 注册一个form进入，方便进行 props 的修改 */
  const regForm = useCallback((name: string, childrenFormProps: StepFormProps) => {
    formMapRef.current.set(name, childrenFormProps);
  }, []);

  /** 接触挂载掉这个 form，同时步数 -1 */
  const unRegForm = useCallback((name: string) => {
    formMapRef.current.delete(name);
    formDataRef.current.delete(name);
  }, []);

  /** Children 计算完成之后，重新生成一下当前的步骤列表 */
  useEffect(() => {
    setFormArray(Array.from(formMapRef.current.keys()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Array.from(formMapRef.current.keys()).join(',')]);

  const currentFormRef = formArrayRef.current[step || 0]?.current;

  useImperativeHandle(propsFormMapRef, () => formArrayRef.current);

  useImperativeHandle(formRef, () => currentFormRef);

  /** ProForm处理了一下 from 的数据，在其中做了一些操作 如果使用 Provider 自带的，自带的数据处理就无法生效了 */
  const onFormFinish = useCallback(
    async (name: string, formData: any) => {
      formDataRef.current.set(name, formData);
      // 如果是最后一步
      if (step === formMapRef.current.size - 1 || formMapRef.current.size === 0) {
        if (!onFinish) {
          return;
        }
        setLoading(true);
        const values: any = merge({}, ...Array.from(formDataRef.current.values()));
        try {
          const success = await onFinish(values);
          if (success) {
            setStep(0);
            formArrayRef.current.forEach((form) => form.current?.resetFields());
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step, formMapRef, onFinish],
  );

  const stepsDom = (
    <div
      className={`${prefixCls}-steps-container`}
      style={{
        maxWidth: Math.min(formArray.length * 320, 1160),
      }}
    >
      <Steps {...stepsProps} current={step} onChange={undefined}>
        {formArray.map((item) => {
          const itemProps = formMapRef.current.get(item);
          return <Steps.Step key={item} title={itemProps?.title} {...itemProps?.stepProps} />;
        })}
      </Steps>
    </div>
  );

  const onSubmit = () => {
    const from = formArrayRef.current[step];
    from.current?.submit();
  };
  const next = submitter !== false && (
    <Button
      key="next"
      type="primary"
      loading={loading}
      {...submitter?.submitButtonProps}
      onClick={() => {
        submitter?.onSubmit?.();
        onSubmit();
      }}
    >
      {intl.getMessage('stepsForm.next', '下一步')}
    </Button>
  );

  const pre = submitter !== false && (
    <Button
      key="pre"
      {...submitter?.resetButtonProps}
      onClick={() => {
        // 没有判断是因为 step<1 这个按钮不显示
        setStep(step - 1);
        submitter?.onReset?.();
      }}
    >
      {intl.getMessage('stepsForm.prev', '上一步')}
    </Button>
  );

  const submit = submitter !== false && (
    <Button
      key="submit"
      type="primary"
      loading={loading}
      {...submitter?.submitButtonProps}
      onClick={() => {
        submitter?.onSubmit?.();
        onSubmit();
      }}
    >
      {intl.getMessage('stepsForm.submit', '提交')}
    </Button>
  );

  const getActionButton = () => {
    const index = step || 0;
    if (index < 1) {
      return [next] as JSX.Element[];
    }
    if (index + 1 === formArray.length) {
      return [pre, submit] as JSX.Element[];
    }
    return [pre, next] as JSX.Element[];
  };

  const renderSubmitter = () => {
    const submitterDom = getActionButton();
    if (submitter && submitter.render) {
      const submitterProps: any = {
        form: formArrayRef.current[step]?.current,
        onSubmit,
        step,
        onPre: () => {
          if (step < 1) {
            return;
          }
          setStep(step - 1);
        },
      };
      return submitter.render(submitterProps, submitterDom) as React.ReactNode;
    }
    if (submitter && submitter?.render === false) {
      return null;
    }
    return submitterDom;
  };

  const formDom = toArray(props.children).map((item, index) => {
    const itemProps = item.props as StepFormProps;
    const name = itemProps.name || `${index}`;
    regForm(name, itemProps);
    /** 是否是当前的表单 */
    const isShow = step === index;

    const config = isShow
      ? {
          contentRender: stepFormRender,
          submitter: false,
        }
      : {};
    return (
      <div
        className={classNames(`${prefixCls}-step`, {
          [`${prefixCls}-step-active`]: isShow,
        })}
        key={name}
      >
        {React.cloneElement(item, {
          ...config,
          ...formProps,
          ...itemProps,
          name,
          step: index,
          key: name,
        })}
      </div>
    );
  });
  const finalStepsDom = props.stepsRender
    ? props.stepsRender(
        formArray.map((item) => ({
          key: item,
          title: formMapRef.current.get(item)?.title,
        })),
        stepsDom,
      )
    : stepsDom;

  const submitterDom = renderSubmitter();

  return (
    <div className={prefixCls}>
      <Form.Provider {...rest}>
        <StepsFormProvide.Provider
          value={{
            loading,
            setLoading,
            keyArray: formArray,
            next: () => {
              if (step > formArray.length - 2) {
                return;
              }
              setStep(step + 1);
            },
            formArrayRef,
            formMapRef,
            unRegForm,
            onFormFinish,
          }}
        >
          {stepsFormRender ? (
            stepsFormRender(
              <>
                {finalStepsDom}
                <div className={`${prefixCls}-container`} style={containerStyle}>
                  {formDom}
                </div>
              </>,
              submitterDom,
            )
          ) : (
            <>
              {finalStepsDom}
              <div className={`${prefixCls}-container`} style={containerStyle}>
                {formDom}
                <Space>{renderSubmitter()}</Space>
              </div>
            </>
          )}
        </StepsFormProvide.Provider>
      </Form.Provider>
    </div>
  );
}

export type { StepFormProps, StepsFormProps };

function StepsFormWarp<T = Record<string, any>>(
  props: StepsFormProps<T> & {
    children: any;
  },
) {
  return (
    <ConfigProviderWrap>
      <StepsForm<T> {...props} />
    </ConfigProviderWrap>
  );
}

StepsFormWarp.StepForm = StepForm;
StepsFormWarp.useForm = Form.useForm;

export default StepsFormWarp;
