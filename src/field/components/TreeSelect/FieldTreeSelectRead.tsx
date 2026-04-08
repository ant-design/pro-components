import { objectToMap, proFieldParsingText } from '../../../utils';
import type { ProFieldFC } from '../../types';
import type { FieldSelectProps } from '../Select';

export function FieldTreeSelectRead(
  props: Parameters<ProFieldFC<{} & FieldSelectProps>>[0] & {
    optionsValueEnum: Map<any, any> | undefined;
    options: any[];
  },
) {
  const { mode, render, fieldProps, optionsValueEnum, options, ...rest } =
    props;
  const dom = (
    <>
      {proFieldParsingText(
        rest.text,
        objectToMap(rest.valueEnum || optionsValueEnum),
      )}
    </>
  );

  if (render) {
    return (
      render(
        rest.text,
        { mode, ...(fieldProps as any), treeData: options },
        dom,
      ) ?? null
    );
  }
  return dom;
}
