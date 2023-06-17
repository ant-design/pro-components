import { ProConfigProvider, useIntl } from '@ant-design/pro-provider';
import { compareVersions, merge, useRefFunction } from '@ant-design/pro-utils';
import type { FormInstance, StepsProps } from 'antd';
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Row,
  Space,
  Steps,
  version,
} from 'antd';

import type { FormProviderProps } from 'antd/lib/form/context';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, {
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ProFormInstance } from '../../BaseForm';
import type { SubmitterProps } from '../../components';
import type { ProFormProps } from '../ProForm';
import type { StepFormProps } from './StepForm';
import StepForm from './StepForm';
import { useStyle } from './style';

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
  /** @name 所有表单的 formMapRef */
  formMapRef?: React.MutableRefObject<
    React.MutableRefObject<FormInstance<any> | undefined>[]
  >;
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
    }
  | undefined
>(undefined);

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

function StepsForm<T = Record<string, any>>(
  props: StepsFormProps<T> & {
    children: React.ReactNode;
  },
) {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-steps-form');

  const { wrapSSR, hashId } = useStyle(prefixCls);

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
  const formArrayRef = useRef<
    React.MutableRefObject<FormInstance<any> | undefined>[]
  >([]);
  const [formArray, setFormArray] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const intl = useIntl();

  /**
   * 受控的方式来操作表单
   */
  const [step, setStep] = useMergedState<number>(0, {
    value: props.current,
    onChange: props.onCurrentChange,
  });

  const layoutRender = useMemo(() => {
    return StepsLayoutStrategy[stepsProps?.direction || 'horizontal'];
  }, [stepsProps?.direction]);

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

  useImperativeHandle(propsFormMapRef, () => formArrayRef.current, [
    formArrayRef.current,
  ]);

  useImperativeHandle(
    formRef,
    () => {
      return formArrayRef.current[step || 0]?.current;
    },
    [step, formArrayRef.current],
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
    const isNewAntd = compareVersions(version, '4.24.0') > -1;
    const itemsProps = isNewAntd
      ? {
          items: formArray.map((item) => {
            const itemProps = formMapRef.current.get(item);
            return {
              key: item,
              title: itemProps?.title,
              ...itemProps?.stepProps,
            };
          }),
        }
      : {};

    return (
      <div
        className={`${prefixCls}-steps-container ${hashId}`.trim()}
        style={{
          maxWidth: Math.min(formArray.length * 320, 1160),
        }}
      >
        <Steps
          {...stepsProps}
          {...itemsProps}
          current={step}
          onChange={undefined}
        >
          {!isNewAntd &&
            formArray.map((item) => {
              const itemProps = formMapRef.current.get(item);
              return (
                <Steps.Step
                  key={item}
                  title={itemProps?.title}
                  {...itemProps?.stepProps}
                />
              );
            })}
        </Steps>
      </div>
    );
  }, [formArray, hashId, prefixCls, step, stepsProps]);

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
          className={classNames(`${prefixCls}-step`, hashId, {
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
        className={`${prefixCls}-container ${hashId}`.trim()}
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
      return stepsFormRender(layoutRender(doms), submitterDom);
    }

    return layoutRender(doms);
  }, [
    finalStepsDom,
    formContainer,
    layoutRender,
    stepsFormRender,
    submitterDom,
  ]);

  return wrapSSR(
    <div className={classNames(prefixCls, hashId)}>
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

export type { StepFormProps, StepsFormProps };
export { StepsFormWarp as StepsForm };
