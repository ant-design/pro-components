import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form, Steps } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import { FormProviderProps } from 'antd/lib/form/context';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import StepForm, { StepFormProps } from './StepForm';

type Store = {
  [name: string]: any;
};

export interface StepsFormProps<T = Store> extends FormProviderProps {
  onFinish: (values: T) => void;
  current?: number;
  onCurrentChange: (current: number) => void;
}

export const StepsFormProvide = React.createContext<
  | {
      unRegForm: (name: string) => void;
      keyArray: string[];
      formMapRef: React.MutableRefObject<Map<string, StepFormProps>>;
      next: () => void;
      pre: () => void;
    }
  | undefined
>(undefined);

const StepsForm: React.FC<StepsFormProps> & {
  StepForm: typeof StepForm;
  useForm: typeof Form.useForm;
} = (props) => {
  const formDataRef = useRef(new Map<string, Store>());
  const formMapRef = useRef(new Map<string, StepFormProps>());
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
  const regForm = useCallback((name: string, formProps: StepFormProps) => {
    formMapRef.current.set(name, formProps);
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
   * 每次children 发生改变的时候重新计算一下
   */
  useEffect(() => {
    formMapRef.current.clear();
  }, [props.children]);

  return (
    <Form.Provider
      onFormFinish={(name, form) => {
        formDataRef.current.set(name, form.values);
        if (props.onFormFinish) {
          props.onFormFinish(name, form);
        }

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
      }}
    >
      <Steps current={step}>
        {formArray.map((item) => {
          const itemProps = formMapRef.current.get(item);
          return <Steps.Step key={item} title={itemProps?.title} />;
        })}
      </Steps>
      <StepsFormProvide.Provider
        value={{
          keyArray: formArray,
          next: () => setStep(step + 1),
          pre: () => setStep(step - 1),
          formMapRef,
          unRegForm,
        }}
      >
        {toArray(props.children).map((item, index) => {
          const itemProps = item.props as StepFormProps;
          const name = itemProps.name || `${index}`;
          regForm(name, itemProps);

          // 如果不是这一步，直接 false
          if (step !== index) {
            return null;
          }
          return React.cloneElement(item, {
            ...itemProps,
            name,
            step: index,
            key: name,
          });
        })}
      </StepsFormProvide.Provider>
    </Form.Provider>
  );
};
StepsForm.StepForm = StepForm;
StepsForm.useForm = Form.useForm;

export default StepsForm;
