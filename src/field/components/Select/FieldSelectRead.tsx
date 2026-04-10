import type { SelectProps } from 'antd';
import {
  objectToMap,
  proFieldParsingText,
  ProSchemaValueEnumObj,
} from '../../../utils';
import type { ProFieldFC } from '../../types';
import type { FieldSelectProps } from './types';

type Props = Parameters<
  ProFieldFC<
    FieldSelectProps & Pick<SelectProps, 'fieldNames' | 'style' | 'className'>
  >
>[0] & {
  valueEnum: FieldSelectProps['valueEnum'];
  optionsValueEnum: Map<any, any> | undefined;
};

export function FieldSelectRead(props: Props) {
  const { mode, render, fieldProps, valueEnum, optionsValueEnum, ...rest } =
    props;
  const dom = (
    <>
      {proFieldParsingText(
        rest.text,
        objectToMap(
          valueEnum || optionsValueEnum,
        ) as unknown as ProSchemaValueEnumObj,
      )}
    </>
  );

  if (render) {
    return render(dom, { mode, ...fieldProps }, dom) ?? null;
  }
  return dom;
}
