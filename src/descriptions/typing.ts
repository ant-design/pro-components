import type { DescriptionsProps, FormProps } from 'antd';
import type { Breakpoint } from 'antd/es/_util/responsiveObserver';
import type {
  CellSemanticClassNames,
  CellSemanticStyles,
} from 'antd/es/descriptions/DescriptionsContext';
import type React from 'react';
import type { ProFieldFCMode } from '../provider';
import type {
  ProCoreActionType,
  ProEllipsis,
  ProSchema,
  ProSchemaComponentTypes,
  RowEditableConfig,
} from '../utils';
import type { LabelTooltipType } from '../utils';
import type { RequestData } from './useFetchData';

export interface DescriptionsItemProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  classNames?: CellSemanticClassNames;
  styles?: CellSemanticStyles;
  children: React.ReactNode;
  span?:
    | number
    | 'filled'
    | {
        [key in Breakpoint]?: number;
      };
}

/** 描述列表单列：基于 {@link ProSchema}，含 hideInDescriptions、mode 等 */
export type ProDescriptionsItemProps<
  T = Record<string, any>,
  ValueType = 'text',
> = ProSchema<
  T,
  Omit<DescriptionsItemProps, 'children'> & {
    hide?: boolean;
    plain?: boolean;
    copyable?: boolean;
    ellipsis?: ProEllipsis;
    mode?: ProFieldFCMode;
    children?: React.ReactNode;
    order?: number;
    index?: number;
  },
  ProSchemaComponentTypes,
  ValueType
>;

export type ProDescriptionsActionType = ProCoreActionType;

export type ProDescriptionsProps<
  RecordType = Record<string, any>,
  ValueType = 'text',
> = Omit<DescriptionsProps, 'children'> & {
  params?: Record<string, any>;
  onRequestError?: (e: Error) => void;
  request?: (params: Record<string, any> | undefined) => Promise<RequestData>;
  columns?: ProDescriptionsItemProps<RecordType, ValueType>[];
  actionRef?: React.MutableRefObject<ProCoreActionType<any> | undefined>;
  loading?: boolean;
  onLoadingChange?: (loading?: boolean) => void;
  tooltip?: LabelTooltipType | string;
  formProps?: FormProps;
  editable?: RowEditableConfig<RecordType>;
  dataSource?: RecordType;
  onDataSourceChange?: (value: RecordType) => void;
  emptyText?: React.ReactNode;
};

/**
 * 与 `src/utils/typing`、`src/field` 对齐的 valueType 符号。
 */
export type {
  ProFieldBuiltinValueType,
  ProFieldSchemaLayoutValueType,
  ProFieldValueObjectType,
  ProFieldValueType,
  ProFieldValueTypeInput,
} from '../utils/typing';

export { PRO_FIELD_SCHEMA_LAYOUT_VALUE_TYPES } from '../utils/typing';
