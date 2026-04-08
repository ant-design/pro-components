import type { RadioGroupProps } from 'antd';
import type { FieldSelectProps } from '../Select';

export type GroupProps = {
  options?: RadioGroupProps['options'];
  radioType?: 'button' | 'radio';
  placeholder?: string;
  variant?: 'outlined' | 'borderless' | 'filled';
} & FieldSelectProps;
