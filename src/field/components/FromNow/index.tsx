import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { FieldFromNowEdit } from './FieldFromNowEdit';
import { FieldFromNowRead } from './FieldFromNowRead';

dayjs.extend(relativeTime);

/**
 * 与当前的时间进行比较 http://momentjs.cn/docs/displaying/fromnow.html
 */
const FieldFromNow: ProFieldFC<{
  text: string;
  format?: string;
  variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
}> = (props, ref) => {
  const intl = useIntl();
  const { mode } = props;

  if (isProFieldReadMode(mode)) {
    return FieldFromNowRead(props);
  }
  if (isProFieldEditOrUpdateMode(mode)) {
    return FieldFromNowEdit({ ...props, intl }, ref);
  }
  return null;
};

export default React.forwardRef(FieldFromNow);
