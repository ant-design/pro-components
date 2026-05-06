import type { DescriptionsProps, FormProps } from 'antd';
import type { DescriptionsItemProps as AntdDescriptionsCellProps } from 'antd/es/descriptions/Item';
import type React from 'react';
import type { ProFieldFCMode } from '../provider';
import type {
  LabelTooltipType,
  ProCoreActionType,
  ProEllipsis,
  ProSchema,
  ProSchemaComponentTypes,
  RowEditableConfig,
  UseEditableMapUtilType,
} from '../utils';
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

/**
 * ProDescriptions actionRef 暴露的方法集合。
 *
 * 与 ProTable 不同，descriptions 是单条记录场景，编辑能力来自 useEditableMap
 * （Map 编辑工具方法），而非 useEditableArray（Array 编辑）。
 * 因此用 ProCoreActionType 的第二个泛型显式注入 Map 编辑工具类型，
 * 保证 actionRef.current 上挂载的是 startEditable / cancelEditable / isEditable 等
 * Map 编辑相关方法，而非 Array 编辑的 addEditRecord / saveEditable 等不存在的方法。
 *
 * 用 Partial 包裹是因为非 editable 模式下这些方法不会被挂载。
 */
export type ProDescriptionsActionType<
  TRecord extends Record<string, any> = Record<string, any>,
> = ProCoreActionType<{}, Partial<UseEditableMapUtilType>> & {
  /** 当前 description 持有的数据源（单条记录） */
  dataSource: TRecord | undefined;
  /** 更新数据源的方法 */
  setDataSource: (value: TRecord | undefined) => void;
};

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
  /**
   * actionRef 接受 ProDescriptionsActionType（推荐，含 Map 编辑方法）
   * 或 ProCoreActionType（向后兼容，仅基础 action）。
   * 使用时建议显式声明为 `ProDescriptionsActionType<TRecord>` 以拿到完整类型提示。
   */
  actionRef?: React.MutableRefObject<
    ProDescriptionsActionType<any> | ProCoreActionType<any> | undefined
  >;
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
