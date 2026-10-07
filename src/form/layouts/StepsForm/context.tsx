import type { FormInstance } from 'antd';
import React from 'react';
import type { StepFormProps } from './StepForm.types';

export const StepsFormProvide = React.createContext<
  | {
      regForm: (name: string, props: StepFormProps<any>) => void;
      unRegForm: (name: string) => void;
      onFormFinish: (name: string, formData: any) => void;
      onFormInit: () => void;
      keyArray: string[];
      formArrayRef: React.MutableRefObject<
        React.MutableRefObject<FormInstance<any> | undefined>[]
      >;
      loading: boolean;
      setLoading: (loading: boolean) => void;
      lastStep: boolean;
      formMapRef: React.MutableRefObject<Map<string, StepFormProps>>;
      next: () => void;
      current: number;
      stepCount: number;
      setCurrent: (index: number) => void;
    }
  | undefined
>(undefined);

export const StepFormProvide = React.createContext<StepFormProps<any> | null>(
  null,
);
