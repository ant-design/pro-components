import type { FormProps, StepsProps } from 'antd';
import type { CommonFormProps } from '../../BaseForm/BaseForm';

export type StepFormProps<
  T = Record<string, any>,
  U = Record<string, any>,
> = {
  step?: number;
  stepProps?: NonNullable<StepsProps['items']>[number];
  index?: number;
} & Omit<FormProps<T>, 'onFinish'> &
  Omit<CommonFormProps<T, U>, 'submitter' | 'form'>;
