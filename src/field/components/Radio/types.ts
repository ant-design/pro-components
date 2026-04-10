import type { RadioGroupProps } from 'antd';
import type { FieldSelectProps } from '../Select';

export type GroupProps = {
  options?: RadioGroupProps['options'];
  radioType?: RadioGroupProps['optionType'];
} & FieldSelectProps;
