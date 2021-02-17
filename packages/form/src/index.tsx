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
import ProFormUploadDragger from './components/UploadDragger';
import ProFormUploadButton from './components/UploadButton';
import ProFormField from './components/Field';
import ProFormSelect from './components/Select';
import ProFormDigit from './components/Digit';
import type { ProFormFieldSetProps } from './components/FieldSet';
import ProFormFieldSet from './components/FieldSet';
import type { ProFormCaptchaProps } from './components/Captcha';
import ProFormCaptcha from './components/Captcha';
import ProFormDependency from './components/Dependency';
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
import type { ProFormListProps } from './components/List';
import ProFormList from './components/List';
import type { FormInstance, FormItemProps, FormProps } from './BaseForm';
import './index.less';

export type {
  ProFormCaptchaProps,
  BaseQueryFilterProps,
  DrawerFormProps,
  ModalFormProps,
  ProFormProps,
  StepFormProps,
  StepsFormProps,
  QueryFilterProps,
  ProFormFieldSetProps,
  ProFormDependencyProps,
  FormProps,
  FormItemProps,
  FormInstance,
  ProFormListProps,
};

const ProFormGroup = ProForm.Group;

export {
  // controls
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormTimePicker,
  ProFormText,
  ProFormTextArea,
  ProFormSwitch,
  ProFormField,
  ProFormList,
  ProFormSelect,
  ProFormDigit,
  ProFormCheckbox,
  ProFormRadio,
  ProFormRate,
  ProFormUploadButton,
  ProFormUploadDragger,
  ProFormSlider,
  ProFormFieldSet,
  ProFormCaptcha,
  ProFormDateTimeRangePicker,
  ProFormDependency,
  ProFormGroup,
  // layouts
  QueryFilter,
  LightFilter,
  StepsForm,
  DrawerForm,
  ModalForm,
};

export default ProForm;
