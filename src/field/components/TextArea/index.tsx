import React from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { FieldTextAreaEdit } from './FieldTextAreaEdit';
import { FieldTextAreaRead } from './FieldTextAreaRead';

/**
 * 最基本的组件，就是个普通的 Input.TextArea
 */
const FieldTextArea: ProFieldFC<{
  text: string;
}> = (props, ref) => {
  const { mode } = props;
  const intl = useIntl();

  if (isProFieldReadMode(mode)) {
    return FieldTextAreaRead(props, ref);
  }
  if (isProFieldEditOrUpdateMode(mode)) {
    return FieldTextAreaEdit({ ...props, intl }, ref);
  }
  return null;
};

export default React.forwardRef(FieldTextArea);
