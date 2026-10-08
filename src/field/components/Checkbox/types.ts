import type { CheckboxGroupProps } from '../../../utils/antdTypes';
import type { FieldSelectProps } from '../Select';

export type GroupProps = {
  layout?: 'horizontal' | 'vertical';
  options?: CheckboxGroupProps['options'];
} & FieldSelectProps;
