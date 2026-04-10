import React from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { FieldSecondEdit } from './FieldSecondEdit';
import { FieldSecondRead } from './FieldSecondRead';
import type { FieldDigitProps, FieldSecondProps } from './types';
import { formatSecond } from './utils';

export { formatSecond };
export type { FieldDigitProps, FieldSecondProps };

/**
 * 格式化秒
 */
const Second: ProFieldFC<FieldSecondProps> = (props, ref) => {
  const intl = useIntl();
  const placeholderValue =
    props.placeholder ||
    intl.getMessage('tableForm.inputPlaceholder', '请输入');
  const { mode: type } = props;

  if (isProFieldReadMode(type)) {
    return FieldSecondRead(props, ref);
  }
  if (isProFieldEditOrUpdateMode(type)) {
    return FieldSecondEdit({ ...props, placeholderValue }, ref);
  }
  return null;
};

export default React.forwardRef(Second);
