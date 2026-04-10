import type { DescriptionsProps, FormProps } from 'antd';
import type { DescriptionsItemProps as AntdDescriptionsCellProps } from 'antd/es/descriptions/Item';
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
import type { ProDescriptionsRequestResult } from './useFetchData';

/** antd Descriptions 单元格 props，与 `antd/es/descriptions/Item` 对齐 */
export type DescriptionsItemProps = AntdDescriptionsCellProps;

type ProDescriptionsCellLayout = Omit<
  AntdDescriptionsCellProps,
  'children' | 'label'
> & {
  label?: React.ReactNode;
  children?: React.ReactNode;
};

/**
 * 描述列表单列配置（`columns` 数组元素）
 */
export type ProDescriptionsColumn<
  TRecord = Record<string, unknown>,
  TValueType = 'text',
> = ProSchema<
  TRecord,
  ProDescriptionsCellLayout & {
    hide?: boolean;
    plain?: boolean;
    copyable?: boolean;
    ellipsis?: ProEllipsis;
    mode?: ProFieldFCMode;
    order?: number;
    index?: number;
  },
  ProSchemaComponentTypes,
  TValueType
>;

/**
 * @deprecated 使用 {@link ProDescriptionsColumn}
 */
export type ProDescriptionsItemProps<
  T = Record<string, unknown>,
  ValueType = 'text',
> = ProDescriptionsColumn<T, ValueType>;

export type ProDescriptionsActionType = ProCoreActionType;

export type ProDescriptionsProps<
  TRecord extends Record<string, any> = Record<string, any>,
  TValueType = 'text',
> = Omit<DescriptionsProps, 'children' | 'items'> & {
  params?: Record<string, unknown>;
  onRequestError?: (e: Error) => void;
  request?: (
    params: Record<string, unknown> | undefined,
  ) => Promise<ProDescriptionsRequestResult<TRecord>>;
  columns?: ProDescriptionsColumn<TRecord, TValueType>[];
  actionRef?: React.MutableRefObject<ProCoreActionType<any> | undefined>;
  loading?: boolean;
  onLoadingChange?: (loading?: boolean) => void;
  tooltip?: LabelTooltipType | string;
  formProps?: FormProps;
  editable?: RowEditableConfig<TRecord>;
  dataSource?: TRecord;
  onDataSourceChange?: (value: TRecord | undefined) => void;
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
