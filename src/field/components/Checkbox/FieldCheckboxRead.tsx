import { theme } from 'antd';
import { objectToMap, proFieldParsingText } from '../../../utils';
import type { ProFieldFC } from '../../types';
import type { GroupProps } from './types';

export function FieldCheckboxRead(
  props: Parameters<ProFieldFC<GroupProps>>[0] & {
    optionsValueEnum: Record<string, any> | undefined;
  },
) {
  const { mode, render, optionsValueEnum, ...rest } = props;
  const { token } = theme.useToken?.() || { token: { marginSM: 8 } };

  const dom = proFieldParsingText(
    rest.text,
    objectToMap(rest.valueEnum || optionsValueEnum),
  );

  if (render) {
    return render(rest.text, { mode, ...rest.fieldProps }, <>{dom}</>) ?? null;
  }
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: token.marginSM,
      }}
    >
      {dom}
    </div>
  );
}
