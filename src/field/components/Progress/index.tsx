import React, { useMemo } from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { toNumber } from '../Percent/util';
import { FieldProgressEdit } from './FieldProgressEdit';
import { FieldProgressRead } from './FieldProgressRead';
import { getProgressStatus } from './utils';

export { getProgressStatus };

/**
 * 进度条组件
 */
const FieldProgress: ProFieldFC<{
  text: number | string;
  placeholder?: string;
}> = (props, ref) => {
  const intl = useIntl();
  const { text, mode, placeholder } = props;
  const placeholderValue =
    placeholder || intl.getMessage('tableForm.inputPlaceholder', '请输入');
  const realValue = useMemo(
    () =>
      typeof text === 'string' && (text as string).includes('%')
        ? toNumber((text as string).replace('%', ''))
        : toNumber(text),
    [text],
  );
  if (isProFieldReadMode(mode)) {
    return FieldProgressRead({ ...props, realValue }, ref);
  }

  if (isProFieldEditOrUpdateMode(mode)) {
    return FieldProgressEdit({ ...props, placeholderValue }, ref);
  }
  return null;
};

export default React.forwardRef(FieldProgress);
