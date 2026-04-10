import { objectToMap, proFieldParsingText } from '../../../utils';
import type { ProFieldFC } from '../../types';
import type { GroupProps } from './types';

export function FieldRadioRead(
  props: Parameters<ProFieldFC<GroupProps>>[0] & {
    optionsValueEnum: Record<string, any> | undefined;
  },
) {
  const { mode, render, optionsValueEnum, ...rest } = props;
  const dom = (
    <>
      {proFieldParsingText(
        rest.text,
        objectToMap(rest.valueEnum || optionsValueEnum),
      )}
    </>
  );

  if (render) {
    return render(rest.text, { mode, ...rest.fieldProps }, dom) ?? null;
  }
  return dom;
}
