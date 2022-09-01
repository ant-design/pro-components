import { ProForm } from './layouts';
// 兼容代码-----------
import 'antd/es/drawer/style';
import 'antd/es/form/style';
import 'antd/es/modal/style';
import 'antd/es/rate/style';
import 'antd/es/row/style';
import 'antd/es/steps/style';
import 'antd/es/tabs/style';
import 'antd/es/upload/style';
//----------------------
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
