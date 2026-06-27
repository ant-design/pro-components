import React, { useImperativeHandle, useRef } from 'react';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { FieldAutoCompleteEdit } from './FieldAutoCompleteEdit';
import { FieldAutoCompleteRead } from './FieldAutoCompleteRead';

/**
 * 自动完成组件，基于 antd AutoComplete。
 * 只读模式下复用纯文本展示，编辑模式下渲染带候选项的输入框。
 */
const FieldAutoComplete: ProFieldFC<{
  text: string;
  emptyText?: React.ReactNode;
}> = (props, ref) => {
  const { text, mode, render, fieldProps, emptyText = '-' } = props;
  const inputRef = useRef<any>(null);

  useImperativeHandle(ref, () => inputRef.current);

  if (isProFieldReadMode(mode)) {
    return (
      <FieldAutoCompleteRead
        text={text}
        mode={mode}
        render={render}
        fieldProps={fieldProps}
        emptyText={emptyText}
      />
    );
  }
  if (isProFieldEditOrUpdateMode(mode)) {
    return (
      <FieldAutoCompleteEdit {...props} inputRef={inputRef} />
    );
  }
  return null;
};

export default React.forwardRef(FieldAutoComplete);
