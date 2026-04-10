import React from 'react';
import { proTheme } from '../../../provider';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { FieldCodeEdit } from './FieldCodeEdit';
import { FieldCodeRead } from './FieldCodeRead';
import { languageFormat } from './utils';

/**
 * 代码片段组件 这个组件为了显示简单的配置，复杂的请使用更加重型的组件
 */
const FieldCode: ProFieldFC<{
  text: string;
  language?: 'json' | 'text';
}> = ({ text, mode, language = 'text', ...rest }, ref) => {
  const code = languageFormat(text, language) as string;
  const { token } = proTheme.useToken();
  if (isProFieldReadMode(mode)) {
    return FieldCodeRead({ text, mode, language, ...rest, code, token }, ref);
  }
  if (isProFieldEditOrUpdateMode(mode)) {
    return FieldCodeEdit({ text, mode, language, ...rest, code }, ref);
  }
  return null;
};

export default React.forwardRef(FieldCode);
