import React, { useRef, useCallback, useState, useEffect, useContext } from 'react';
import { Form, Steps } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import { FormProviderProps } from 'antd/lib/form/context';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { StepsProps } from 'antd/lib/steps';
import classNames from 'classnames';
import { ConfigContext } from 'antd/lib/config-provider';

import StepFrom, { StepFromProps } from './StepFrom';
import './index.less';
import { ProFormProps } from '../ProForm';

type Store = {
  [name: string]: any;
};

interface StepsFromProps<T = Store> extends FormProviderProps {
  onFinish?: (values: T) => void;
  current?: number;
  stepsProps?: StepsProps;
  formProps?: ProFormProps;
  onCurrentChange?: (current: number) => void;
  /**
   * 自定义分布表单
   */
  renderSteps?: (
    steps: Array<{
      key: string;
      title?: React.ReactNode;
    }>,
    defaultDom: React.ReactNode,
  ) => React.ReactNode;
}

export const StepsFromProvide = React.createContext<
  | {
      unRegForm: (name: string) => void;
      onFormFinish: (name: string, formData: any) => void;
      keyArray: string[];

      formMapRef: React.MutableRefObject<Map<string, StepFromProps>>;
      next: () => void;
      pre: () => void;
    }
  | undefined
>(undefined);

const StepsFrom: React.FC<StepsFromProps> & {
  StepFrom: typeof StepFrom;
  useForm: typeof Form.useForm;
} = (props) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pro-steps-form');

  const { current, onCurrentChange, stepsProps, onFinish, formProps, ...rest } = props;
  const formDataRef = useRef(new Map<string, Store>());
  const formMapRef = useRef(new Map<string, StepFromProps>());
  const [formArray, setFormArray] = useState<string[]>([]);

  /**
   * 受控的方式来操作表单
   */
  const [step, setStep] = useMergedState<number>(0, {
    value: props.current,
    onChange: props.onCurrentChange,
  });

  /**
   * 注册一个form进入，方便进行 props 的修改
   */
  const regForm = useCallback((name: string, childrenFormProps: StepFromProps) => {
    formMapRef.current.set(name, childrenFormProps);
  }, []);

  /**
   * 接触挂载掉这个 form，同时步数 -1
   */
  const unRegForm = useCallback((name: string) => {
    formMapRef.current.delete(name);
    formDataRef.current.delete(name);
  }, []);

  /**
   * children 计算完成之后，重新生成一下当前的步骤列表
   */
  useEffect(() => {
    setFormArray(Array.from(formMapRef.current.keys()));
  }, [Array.from(formMapRef.current.keys()).join(',')]);

  /**
   * proForm处理了一下 from 的数据，在其中做了一些操作
   * 如果使用 Provider 自带的，自带的数据处理就无法生效了
   */
  const onFormFinish = useCallback(
    (name: string, formData: any) => {
      formDataRef.current.set(name, formData);
      // 如果是最后一步
      if (step === formArray.length - 1) {
        if (!props.onFinish) {
          return;
        }
        const values = Array.from(formDataRef.current.values()).reduce((pre, cur) => {
          return {
            ...pre,
            ...cur,
          };
        }, {});
        props.onFinish(values);
      }
    },
    [step],
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
          return <Steps.Step key={item} title={itemProps?.title} />;
        })}
      </Steps>
    </div>
  );

  return (
    <div className={prefixCls}>
      <Form.Provider {...rest}>
        {props.renderSteps
          ? props.renderSteps(
              formArray.map((item) => ({
                key: item,
                title: formMapRef.current.get(item)?.title,
              })),
              stepsDom,
            )
          : stepsDom}
        <StepsFromProvide.Provider
          value={{
            keyArray: formArray,
            next: () => {
              if (step > formArray.length - 2) {
                return;
              }
              setStep(step + 1);
            },
            pre: () => {
              if (step < 1) {
                return;
              }
              setStep(step - 1);
            },
            formMapRef,
            unRegForm,
            onFormFinish,
          }}
        >
          {toArray(props.children).map((item, index) => {
            const itemProps = item.props as StepFromProps;
            const name = itemProps.name || `${index}`;
            regForm(name, itemProps);

            return (
              <div
                className={classNames(`${prefixCls}-step`, {
                  [`${prefixCls}-step-active`]: step === index,
                })}
                key={name}
              >
                {React.cloneElement(item, {
                  ...formProps,
                  ...itemProps,
                  name,
                  step: index,
                  key: name,
                })}
              </div>
            );
          })}
        </StepsFromProvide.Provider>
      </Form.Provider>
    </div>
  );
};

StepsFrom.StepFrom = StepFrom;
StepsFrom.useForm = Form.useForm;

export type { StepFromProps, StepsFromProps };

export default StepsFrom;
