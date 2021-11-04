import ProFormDatePicker from './components/DatePicker';
import ProFormDateTimePicker from './components/DateTimePicker';
import ProFormText from './components/Text';
import ProFormDateRangePicker from './components/DateRangePicker';
import ProFormDateTimeRangePicker from './components/DateTimeRangePicker';
import ProFormTimePicker from './components/TimePicker';
import ProFormTextArea from './components/TextArea';
import ProFormCheckbox from './components/Checkbox';
import ProFormRadio from './components/Radio';
import ProFormSwitch from './components/Switch';
import ProFormRate from './components/Rate';
import ProFormSlider from './components/Slider';
import ProFormCascader from './components/Cascader';
import ProFormUploadDragger from './components/UploadDragger';
import ProFormUploadButton from './components/UploadButton';
import type { ProFormFieldProps } from './components/Field';
import ProFormField from './components/Field';
import ProFormSelect from './components/Select';
import ProFormDigit from './components/Digit';
import ProFormMoney from './components/Money';
import type { ProFormFieldSetProps } from './components/FieldSet';
import ProFormFieldSet from './components/FieldSet';
import type { ProFormCaptchaProps } from './components/Captcha';
import ProFormCaptcha from './components/Captcha';
import ProFormDependency from './components/Dependency';
import ProFormColorPicker from './components/ColorPicker';
import type { ProFormDependencyProps } from './components/Dependency';

import type { ProFormProps } from './layouts/ProForm';
import ProForm from './layouts/ProForm';
import type { BaseQueryFilterProps, QueryFilterProps } from './layouts/QueryFilter';
import QueryFilter from './layouts/QueryFilter';
import LightFilter from './layouts/LightFilter';
import type { StepFormProps, StepsFormProps } from './layouts/StepsForm';
import StepsForm from './layouts/StepsForm';
import type { ModalFormProps } from './layouts/ModalForm';
import ModalForm from './layouts/ModalForm';
import type { DrawerFormProps } from './layouts/DrawerForm';
import DrawerForm from './layouts/DrawerForm';
import type { LoginFormProps } from './layouts/LoginForm';
import LoginForm from './layouts/LoginForm';
import type { ProFormListProps } from './components/List';
import ProFormList from './components/List';
import type { FormInstance, FormItemProps, FormProps, ProFormInstance } from './BaseForm';
import type { ProFormLayoutType, ProFormColumnsType } from './components/SchemaForm';
import BetaSchemaForm from './components/SchemaForm';
import './index.less';
import { ProFormContext } from '@ant-design/pro-utils';
import type { LightFilterFooterRender, ProFormFieldItemProps } from './interface';
import { FormItemProvide } from './components/FormItem';

export type {
  ProFormFieldProps,
  ProFormCaptchaProps,
  BaseQueryFilterProps,
  DrawerFormProps,
  ModalFormProps,
  ProFormProps,
  StepFormProps,
  ProFormLayoutType,
  StepsFormProps,
  QueryFilterProps,
  ProFormFieldSetProps,
  ProFormDependencyProps,
  FormProps,
  FormItemProps,
  FormInstance,
  ProFormListProps,
  LightFilterFooterRender,
  ProFormFieldItemProps as ProFormItemProps,
  ProFormColumnsType,
  LoginFormProps,
  ProFormInstance,
};

const ProFormGroup = ProForm.Group;

export {
  // controls
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormTimePicker,
  ProFormText,
  ProFormCascader,
  ProFormTextArea,
  ProFormSwitch,
  ProFormField,
  ProFormList,
  ProFormSelect,
  FormItemProvide,
  ProFormDigit,
  ProFormMoney,
  ProFormCheckbox,
  ProFormRadio,
  ProFormRate,
  ProFormUploadButton,
  ProFormUploadDragger,
  ProFormSlider,
  ProFormFieldSet,
  ProFormCaptcha,
  ProFormColorPicker,
  ProFormDateTimeRangePicker,
  ProFormDependency,
  ProFormGroup,
  BetaSchemaForm,
  // layouts
  QueryFilter,
  LightFilter,
  StepsForm,
  DrawerForm,
  ModalForm,
  ProFormContext,
  LoginForm,
};

export default ProForm;
