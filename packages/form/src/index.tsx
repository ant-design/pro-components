import './index.less';

export { ProFormContext } from '@ant-design/pro-utils';

export type {
  FormInstance,
  FormItemProps,
  FormProps,
  ProFormInstance,
  LightWrapperProps,
} from './BaseForm';

export type {
  LightFilterFooterRender,
  ProFormFieldItemProps as ProFormItemProps,
} from './interface';

export type {
  ProFormFieldProps,
  ProFormCaptchaProps,
  ProFormLayoutType,
  ProFormFieldSetProps,
  ProFormDependencyProps,
  ProFormListProps,
  ProFormColumnsType,
  ProFormDigitRangeProps,
} from './components';

export { FieldContext } from './FieldContext';

import { ProForm } from './layouts';

export * from './layouts';

export * from './components';

export default ProForm;
