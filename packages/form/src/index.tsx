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
import ProFromFieldSet, { ProFromFieldSetProps } from './components/FieldSet';
import ProFormCaptcha, { ProFormCaptchaProps } from './components/Captcha';

import ProForm, { ProFormProps } from './layouts/ProForm';
import QueryFilter, { BaseQueryFilterProps, QueryFilterProps } from './layouts/QueryFilter';
import LightFilter from './layouts/LightFilter';
import StepsForm, { StepFormProps, StepsFormProps } from './layouts/StepsForm';
import ModalForm, { ModalFormProps } from './layouts/ModalForm';
import DrawerForm, { DrawerFormProps } from './layouts/DrawerForm';
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
  ProFromFieldSetProps,
};
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
  ProFormSelect,
  ProFormDigit,
  ProFormCheckbox,
  ProFormRadio,
  ProFormRate,
  ProFormUploadButton,
  ProFormUploadDragger,
  ProFormSlider,
  ProFromFieldSet,
  ProFormCaptcha,
  ProFormDateTimeRangePicker,
  // layouts
  QueryFilter,
  LightFilter,
  StepsForm,
  DrawerForm,
  ModalForm,
};

export default ProForm;
