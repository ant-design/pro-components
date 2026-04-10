import type { CheckboxGroupProps } from 'antd/lib/checkbox';
import type { FieldSelectProps } from '../Select';

export type GroupProps = {
  layout?: 'horizontal' | 'vertical';
  options?: CheckboxGroupProps['options'];
} & FieldSelectProps;
