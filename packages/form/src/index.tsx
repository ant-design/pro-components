import './index.less';
import { ProForm } from './layouts';

export { ProFormContext } from '@ant-design/pro-utils';
export type {
  FormInstance,
  FormItemProps,
  FormProps,
  LightWrapperProps,
  ProFormInstance,
} from './BaseForm';
export * from './components';
export type {
  FormListActionType,
  ProFormCaptchaProps,
  ProFormColumnsType,
  ProFormDependencyProps,
  ProFormDigitRangeProps,
  ProFormFieldProps,
  ProFormFieldSetProps,
  ProFormLayoutType,
  ProFormListProps,
} from './components';
export { FieldContext } from './FieldContext';
export type {
  LightFilterFooterRender,
  ProFormFieldItemProps as ProFormItemProps,
} from './interface';
export * from './layouts';

export default ProForm;
