import { toArray, useControlledState } from '@rc-component/util';
import type { FormInstance, StepsProps } from 'antd';
import { Button, Col, ConfigProvider, Form, Row, Space, Steps } from 'antd';
import type { FormProviderProps } from 'antd/lib/form/context';
import { clsx } from 'clsx';
import React, {
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ProConfigProvider, useIntl } from '../../../provider';
import { merge, useRefFunction } from '../../../utils';
import type { ProFormInstance } from '../../BaseForm';
import type { SubmitterProps } from '../../BaseForm/Submitter';
import type { ProFormProps } from '../ProForm';
import type { StepFormProps } from './StepForm';
import StepForm from './StepForm';
import { useStyle } from './style';

/**
 * 分步表单容器 ref：合并各步取值与跨步控制（`formRef` 仍仅指向当前步）
 */
export type StepsFormRef = {
  /**
   * 合并所有分步表单的 `getFieldsValue`（后者覆盖同名字段，与最终 `onFinish` 合并规则一致）
   * @description 各步表单在 DOM 中均会挂载（非当前步仅隐藏），故包含尚未展示步骤里已有初值/已填值
   */
  getAllFieldsValue: () => Record<string, any>;
  /**
   * 合并所有分步表单的 `getFieldsFormatValue`（含 transform）
   * @description 与各步挂载方式同 `getAllFieldsValue`
   */
  getAllFieldsFormatValue: (omitNil?: boolean) => Record<string, any>;
  getCurrentStep: () => number;
  /** 跳转到指定步，不触发表单校验；越界则忽略 */
  setCurrentStep: (stepIndex: number) => void;
  getStepFormInstance: (stepIndex: number) => ProFormInstance | undefined;
  /** 清空分步缓存、重置各步表单并回到第一步 */
  resetSteps: () => void;
};

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
  formRef?: React.MutableRefObject<ProFormInstance<any> | undefined | null>;
  /**
   * 分步容器 ref：合并取值、指定步表单实例、无校验跳转等
   * @name 分步容器 ref
   */
  stepsFormRef?: React.MutableRefObject<StepsFormRef | null | undefined>;
  /** @name 所有表单的 formMapRef */
  formMapRef?: React.MutableRefObject<
    React.MutableRefObject<FormInstance<any> | undefined>[]
  >;
  /**
   * 是否允许点击步骤条切换步骤（不触发表单校验；若多步存在同名字段，合并规则与提交一致）
   * @default false
   */
  allowStepSelect?: boolean;
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
  stepsFormRender?: (
    from: React.ReactNode,
    submitter: React.ReactNode,
  ) => React.ReactNode;
  /** 按钮的统一配置，优先级低于分步表单的配置 */
  submitter?:
    | SubmitterProps<{
        step: number;
        onPre: () => void;
        form?: FormInstance<any>;
      }>
    | false;

  containerStyle?: React.CSSProperties;
  /**
   * 自定義整個佈局。
   *
   * @param layoutDom stepsDom 和 formDom 元素可以放置在任何地方。
   */
  layoutRender?: (layoutDom: {
    stepsDom: React.ReactElement;
    formDom: React.ReactElement;
  }) => React.ReactNode;
} & Omit<FormProviderProps, 'children'>;

export const StepsFormProvide = React.createContext<
  | {
      regForm: (name: string, props: StepsFormProps<any>) => void;
      unRegForm: (name: string) => void;
      onFormFinish: (name: string, formData: any) => void;
      keyArray: string[];
      formArrayRef: React.MutableRefObject<
        React.MutableRefObject<FormInstance<any> | undefined>[]
      >;
      loading: boolean;
      setLoading: (loading: boolean) => void;
      lastStep: boolean;
      formMapRef: React.MutableRefObject<Map<string, StepFormProps>>;
      next: () => void;
      /** 当前步骤下标，从 0 开始 */
      current: number;
      /** 已注册的分步数量 */
      stepCount: number;
      /** 跳转到指定步，不触发表单校验；越界则忽略 */
      setCurrent: (index: number) => void;
    }
  | undefined
>(undefined);

/**
 * 获取 StepsForm 上下文（current / setCurrent / stepCount / loading 等），须在 StepsForm 内使用
 */
export function useStepsFormContext() {
  const ctx = useContext(StepsFormProvide);
  if (!ctx) {
    throw new Error(
      '[@ant-design/pro-components] useStepsFormContext must be used within StepsForm',
    );
  }
  return ctx;
}

interface LayoutRenderDom {
  stepsDom: React.ReactElement;
  formDom: React.ReactElement;
}

const StepsLayoutStrategy: Record<
  string,
  (dom: LayoutRenderDom) => React.ReactNode
> = {
  horizontal({ stepsDom, formDom }) {
    return (
      <>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col span={24}>{stepsDom}</Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col span={24}>{formDom}</Col>
        </Row>
      </>
    );
  },
  vertical({ stepsDom, formDom }) {
    return (
      <Row align="stretch" wrap={true} gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col xxl={4} xl={6} lg={7} md={8} sm={10} xs={12}>
          {React.cloneElement(stepsDom, {
            style: {
              height: '100%',
            },
          })}
        </Col>
        <Col>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            {formDom}
          </div>
        </Col>
      </Row>
    );
  },
};

/**
 * 给  StepForm 传递信息
 */
export const StepFormProvide = React.createContext<StepFormProps<any> | null>(
  null,
);

function StepsForm<T = Record<string, any>>(
  props: StepsFormProps<T> & {
    children: React.ReactNode;
  },
) {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-steps-form');

  const { wrapSSR, hashId } = useStyle(prefixCls);

  const {
    current: _propsCurrent,
    onCurrentChange: _propsOnCurrentChange,
    submitter,
    stepsFormRender,
    stepsRender,
    stepFormRender,
    stepsProps,
    onFinish,
    formProps,
    containerStyle,
    formRef,
    stepsFormRef: propsStepsFormRef,
    formMapRef: propsFormMapRef,
    allowStepSelect = false,
    layoutRender: propsLayoutRender,
    ...rest
  } = props;

  const formDataRef = useRef(new Map<string, Record<string, any>>());
  const formMapRef = useRef(new Map<string, StepFormProps>());
  const formArrayRef = useRef<
    React.MutableRefObject<FormInstance<any> | undefined>[]
  >([]);
  const [formArray, setFormArray] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const intl = useIntl();

  /**
   * 受控的方式来操作表单
   */
  const [step, setStepInner] = useControlledState<number>(0, props.current);

  /**
   * 使用 useRefFunction 包装回调，确保引用稳定
   */
  const onCurrentChangeCallback = useRefFunction((current: number) => {
    props.onCurrentChange?.(current);
  });

  /**
   * 使用 queueMicrotask 延迟回调调用，避免在渲染阶段调用外部回调导致的 React 警告
   * "Cannot update a component while rendering a different component"
   */
  const setStep = useCallback(
    (updater: number | ((prev: number) => number)) => {
      setStepInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: number) => number)(prev)
            : updater;
        queueMicrotask(() => {
          onCurrentChangeCallback(next);
        });
        return next;
      });
    },
    [onCurrentChangeCallback],
  );

  const layoutRender = useMemo(() => {
    return StepsLayoutStrategy[stepsProps?.orientation || 'horizontal'];
  }, [stepsProps?.orientation]);

  const lastStep = useMemo(
    () => step === formArray.length - 1,
    [formArray.length, step],
  );

  /**
   * 注册一个form进入，方便进行 props 的修改
   */
  const regForm = useCallback(
    (name: string, childrenFormProps: StepFormProps) => {
      if (!formMapRef.current.has(name)) {
        setFormArray((oldFormArray) => [...oldFormArray, name]);
      }
      formMapRef.current.set(name, childrenFormProps);
    },
    [],
  );

  /**
   * 解除挂载掉这个 form，同时步数 -1
   */
  const unRegForm = useCallback((name: string) => {
    setFormArray((oldFormArray) => oldFormArray.filter((n) => n !== name));
    formMapRef.current.delete(name);
    formDataRef.current.delete(name);
  }, []);

  const setCurrentStepSafe = useRefFunction((index: number) => {
    if (index < 0 || index >= formArrayRef.current.length) {
      return;
    }
    setStep(index);
  });

  useImperativeHandle(propsFormMapRef, () => formArrayRef.current, [formArray]);

  useImperativeHandle(formRef, () => {
    return formArrayRef.current[step || 0]?.current;
  }, [step, formArray.length]);

  useImperativeHandle(
    propsStepsFormRef,
    (): StepsFormRef => ({
      getAllFieldsValue: () => {
        const parts: Record<string, any>[] = [];
        formArrayRef.current.forEach((ref) => {
          const inst = ref.current;
          if (inst?.getFieldsValue) {
            parts.push(inst.getFieldsValue(true));
          }
        });
        return merge({}, ...parts);
      },
      getAllFieldsFormatValue: (omitNil?: boolean) => {
        const parts: Record<string, any>[] = [];
        formArrayRef.current.forEach((ref) => {
          const inst = ref.current as ProFormInstance | undefined;
          if (inst?.getFieldsFormatValue) {
            parts.push(inst.getFieldsFormatValue(true, omitNil));
          }
        });
        return merge({}, ...parts);
      },
      getCurrentStep: () => step,
      setCurrentStep: (index: number) => {
        setCurrentStepSafe(index);
      },
      getStepFormInstance: (index: number) => {
        return formArrayRef.current[index]?.current as ProFormInstance | undefined;
      },
      resetSteps: () => {
        formDataRef.current.clear();
        setStep(0);
        formArrayRef.current.forEach((r) => {
          r.current?.resetFields?.();
        });
      },
    }),
    [step, setCurrentStepSafe, setStep],
  );

  /**
   * ProForm处理了一下 from 的数据，在其中做了一些操作 如果使用 Provider 自带的，自带的数据处理就无法生效了
   */
  const onFormFinish = useCallback(
    async (name: string, formData: any) => {
      formDataRef.current.set(name, formData);
      // 如果不是最后一步
      if (!lastStep || !onFinish) {
        return;
      }

      setLoading(true);
      const values: any = merge(
        {},
        ...Array.from(formDataRef.current.values()),
      );
      try {
        const success = await onFinish(values);
        if (success) {
          setStep(0);
          formArrayRef.current.forEach((form) => form.current?.resetFields());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [lastStep, onFinish, setLoading, setStep],
  );

  const stepsDom = useMemo(() => {
    const itemsProps = {
      items: formArray.map((item) => {
        const itemProps = formMapRef.current.get(item);
        const stepItemProps: any = {
          key: item,
          title: itemProps?.title,
          ...itemProps?.stepProps,
        };
        // Convert deprecated description to content
        if (stepItemProps.description) {
          stepItemProps.content = stepItemProps.description;
          delete stepItemProps.description;
        }
        return stepItemProps;
      }),
    };

    return (
      <div
        className={clsx(`${prefixCls}-steps-container`, hashId)}
        style={{
          maxWidth: Math.min(formArray.length * 320, 1160),
        }}
      >
        <Steps
          {...stepsProps}
          {...itemsProps}
          current={step}
          onChange={
            allowStepSelect
              ? (nextStep) => {
                  setCurrentStepSafe(nextStep);
                  stepsProps?.onChange?.(nextStep);
                }
              : stepsProps?.onChange
          }
        />
      </div>
    );
  }, [
    allowStepSelect,
    formArray,
    hashId,
    prefixCls,
    setCurrentStepSafe,
    step,
    stepsProps,
  ]);

  const onSubmit = useRefFunction(() => {
    const from = formArrayRef.current[step];
    from.current?.submit();
  });

  /** 上一页功能 */
  const prePage = useRefFunction(() => {
    if (step < 1) return;
    setStep(step - 1);
  });

  const next = useMemo(() => {
    return (
      submitter !== false && (
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
      )
    );
  }, [intl, loading, onSubmit, submitter]);

  const pre = useMemo(() => {
    return (
      submitter !== false && (
        <Button
          key="pre"
          {...submitter?.resetButtonProps}
          onClick={() => {
            prePage();
            submitter?.onReset?.();
          }}
        >
          {intl.getMessage('stepsForm.prev', '上一步')}
        </Button>
      )
    );
  }, [intl, prePage, submitter]);

  const submit = useMemo(() => {
    return (
      submitter !== false && (
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
      )
    );
  }, [intl, loading, onSubmit, submitter]);

  const nextPage = useRefFunction(() => {
    // Ensure we have forms registered before checking step bounds
    if (formArray.length === 0) return;
    if (step > formArray.length - 2) return;
    setStep(step + 1);
  });

  const submitterDom = useMemo(() => {
    let buttons: (React.ReactElement | false)[] = [];
    const index = step || 0;
    if (index < 1) {
      // 如果有且只有一个 StepForm 第一步就应该是提交按钮
      if (formArray.length === 1) {
        buttons.push(submit);
      } else {
        buttons.push(next);
      }
    } else if (index + 1 === formArray.length) {
      buttons.push(pre, submit);
    } else {
      buttons.push(pre, next);
    }

    buttons = buttons.filter(React.isValidElement);

    if (submitter && submitter.render) {
      const submitterProps: any = {
        form: formArrayRef.current[step]?.current,
        onSubmit,
        step,
        onPre: prePage,
      };

      return submitter.render(
        submitterProps,
        buttons as React.ReactElement[],
      ) as React.ReactNode;
    }
    if (submitter && submitter?.render === false) {
      return null;
    }
    return buttons as React.ReactElement[];
  }, [formArray.length, next, onSubmit, pre, prePage, step, submit, submitter]);

  const formDom = useMemo(() => {
    return toArray(props.children).map((item, index) => {
      const itemProps = item.props as StepFormProps;
      const name = itemProps.name || `${index}`;
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
          className={clsx(`${prefixCls}-step`, hashId, {
            [`${prefixCls}-step-active`]: isShow,
          })}
          key={name}
        >
          <StepFormProvide.Provider
            value={{
              ...config,
              ...formProps,
              ...itemProps,
              name,
              step: index,
            }}
          >
            {item}
          </StepFormProvide.Provider>
        </div>
      );
    });
  }, [formProps, hashId, prefixCls, props.children, step, stepFormRender]);

  const finalStepsDom = useMemo(() => {
    if (stepsRender) {
      return stepsRender(
        formArray.map((item) => ({
          key: item,
          title: formMapRef.current.get(item)?.title,
        })),
        stepsDom,
      ) as React.ReactElement;
    }
    return stepsDom;
  }, [formArray, stepsDom, stepsRender]);

  const formContainer = useMemo(
    () => (
      <div
        className={clsx(`${prefixCls}-container`, hashId)}
        style={containerStyle}
      >
        {formDom}
        {stepsFormRender ? null : <Space>{submitterDom}</Space>}
      </div>
    ),
    [containerStyle, formDom, hashId, prefixCls, stepsFormRender, submitterDom],
  );

  const stepsFormDom = useMemo(() => {
    const doms = {
      stepsDom: finalStepsDom,
      formDom: formContainer,
    };

    if (stepsFormRender) {
      if (propsLayoutRender) {
        return stepsFormRender(propsLayoutRender(doms), submitterDom);
      } else {
        return stepsFormRender(layoutRender(doms), submitterDom);
      }
    }

    if (propsLayoutRender) {
      return propsLayoutRender(doms);
    }

    return layoutRender(doms);
  }, [
    finalStepsDom,
    formContainer,
    layoutRender,
    stepsFormRender,
    submitterDom,
    propsLayoutRender,
  ]);

  return wrapSSR(
    <div className={clsx(prefixCls, hashId)}>
      <Form.Provider {...rest}>
        <StepsFormProvide.Provider
          value={{
            loading,
            setLoading,
            regForm,
            keyArray: formArray,
            next: nextPage,
            formArrayRef,
            formMapRef,
            lastStep,
            unRegForm,
            onFormFinish,
            current: step,
            stepCount: formArray.length,
            setCurrent: setCurrentStepSafe,
          }}
        >
          {stepsFormDom}
        </StepsFormProvide.Provider>
      </Form.Provider>
    </div>,
  );
}
function StepsFormWarp<T = Record<string, any>>(
  props: StepsFormProps<T> & {
    children: any;
  },
) {
  return (
    <ProConfigProvider needDeps>
      <StepsForm<T> {...props} />
    </ProConfigProvider>
  );
}

StepsFormWarp.StepForm = StepForm;
StepsFormWarp.useForm = Form.useForm;
StepsFormWarp.useStepsFormContext = useStepsFormContext;

export { StepsFormWarp as StepsForm };
export type { StepFormProps, StepsFormProps, StepsFormRef };
