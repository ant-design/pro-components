import React from 'react';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { FieldSliderEdit } from './FieldSliderEdit';
import { FieldSliderRead } from './FieldSliderRead';

/**
 * 评分组件
 */
const FieldSlider: ProFieldFC<{
  text: string;
}> = (props, ref) => {
  const { mode } = props;
  if (isProFieldReadMode(mode)) {
    return FieldSliderRead(props);
  }
  if (isProFieldEditOrUpdateMode(mode)) {
    return FieldSliderEdit(props, ref);
  }
  return null;
};

export default React.forwardRef(FieldSlider);
