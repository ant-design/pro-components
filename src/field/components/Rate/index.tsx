import React from 'react';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { FieldRateEdit } from './FieldRateEdit';
import { FieldRateRead } from './FieldRateRead';

/**
 * 评分组件
 */
const FieldRate: ProFieldFC<{
  text: string;
}> = (props, ref) => {
  const { mode } = props;
  if (isProFieldReadMode(mode)) {
    return FieldRateRead(props, ref);
  }
  if (isProFieldEditOrUpdateMode(mode)) {
    return FieldRateEdit(props, ref);
  }
  return null;
};

export default React.forwardRef(FieldRate);
