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
  // #8978 用单个 span 包裹枚举渲染结果（多选时是一串 Badge）：
  // Typography.Text 的 ellipsis 只对纯文本子节点生效，
  // Fragment 列表会让省略失效，包一层后省略/复制行为恢复正常
  const dom = (
    <span className="pro-field-select-read">
      {proFieldParsingText(
        rest.text,
        objectToMap(
          valueEnum || optionsValueEnum,
        ) as unknown as ProSchemaValueEnumObj,
      )}
    </span>
  );

  if (render) {
    return render(dom, { mode, ...fieldProps }, dom) ?? null;
  }
  return dom;
}
