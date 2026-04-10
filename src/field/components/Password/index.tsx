import { omit, useControlledState } from '@rc-component/util';
import React, { useCallback } from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { FieldPasswordEdit } from './FieldPasswordEdit';
import { FieldPasswordRead } from './FieldPasswordRead';

/**
 * 最基本的组件，就是个普通的 Input.Password
 */
const FieldPassword: ProFieldFC<{
  text: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}> = (props, ref) => {
  const intl = useIntl();
  const { text, mode, render, formItemRender, fieldProps, ...rest } = omit(
    props,
    ['proFieldKey'],
  );
  const [open, setOpenInner] = useControlledState<boolean>(
    () => rest.open || false,
    rest.open,
  );
  const setOpen = useCallback(
    (updater: boolean | ((prev: boolean) => boolean)) => {
      setOpenInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: boolean) => boolean)(prev)
            : updater;
        rest.onOpenChange?.(next);
        return next;
      });
    },
    [rest.onOpenChange],
  );

  const merged = {
    text,
    mode,
    render,
    formItemRender,
    fieldProps,
    ...rest,
  };

  if (isProFieldReadMode(mode)) {
    return FieldPasswordRead({ ...merged, open, setOpen }, ref);
  }
  if (isProFieldEditOrUpdateMode(mode)) {
    return FieldPasswordEdit({ ...merged, intl }, ref);
  }
  return null;
};

export default React.forwardRef(FieldPassword);
