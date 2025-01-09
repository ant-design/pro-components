import { ProForm } from './layouts';
// 兼容代码-----------
import 'antd/lib/drawer/style';
import 'antd/lib/form/style';
import 'antd/lib/modal/style';
import 'antd/lib/rate/style';
import 'antd/lib/row/style';
import 'antd/lib/steps/style';
import 'antd/lib/tabs/style';
import 'antd/lib/upload/style';
import { GridContext } from './helpers';
import type { ProFormGroupProps } from './typing';
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
  ProFormCheckboxGroupProps,
  ProFormCheckboxProps,
  ProFormColorPickerProps,
  ProFormColumnsType,
  ProFormDependencyProps,
  ProFormDigitProps,
  ProFormDigitRangeProps,
  ProFormFieldProps,
  ProFormFieldSetProps,
  ProFormLayoutType,
  ProFormListProps,
  ProFormMoneyProps,
  ProFormRadioGroupProps,
  ProFormSelectProps,
  ProFormSliderProps,
  ProFormSwitchProps,
  ProFormTreeSelectProps,
  ProFormUploadButtonProps,
  ProFormUploadDraggerProps,
} from './components';
export { FormListContext } from './components/List';
export { FieldContext } from './FieldContext';
export * from './layouts';
export type {
  LightFilterFooterRender,
  ProFormFieldItemProps as ProFormItemProps,
} from './typing';
export { GridContext, ProForm };
export type { ProFormGroupProps as GroupProps };

export default ProForm;
