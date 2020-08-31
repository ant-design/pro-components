import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form, Steps } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import { FormProviderProps } from 'antd/lib/form/context';
import StepForm, { StepFormProps } from './StepForm';

type Store = {
  [name: string]: any;
};

export interface StepsFormProps<T = Store> extends FormProviderProps {
  onFinish: (values: T) => void;
}

export const StepsFormProvide = React.createContext<
  | {
      unRegForm: (name: string, props: StepFormProps) => void;
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
  const [step, setStep] = useState<number>(0);

  const regForm = useCallback((name: string, formProps: StepFormProps) => {
    formMapRef.current.set(name, formProps);
  }, []);

  const unRegForm = useCallback((name: string) => {
    formMapRef.current.delete(name);
  }, []);

  useEffect(() => {
    setFormArray(Array.from(formMapRef.current.keys()));
  }, [Array.from(formMapRef.current.keys()).join(',')]);

  return (
    <Form.Provider
      onFormFinish={(name, form) => {
        formDataRef.current.set(name, form.values);
        if (props.onFormFinish) {
          props.onFormFinish(name, form);
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
            index,
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
