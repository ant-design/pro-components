import { warning } from '@rc-component/util';
import type { PaginationProps } from 'antd';
import { ConfigProvider } from 'antd';
import { clsx } from 'clsx';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import type { CheckCardProps } from '../card';
import { ProConfigProvider } from '../provider';
import type {
  ActionType,
  ProColumns,
  ProColumnType,
  ProTableProps,
} from '../table';
import ProTable from '../table';
import type { LabelTooltipType, ProFieldValueType } from '../utils';
import type { ItemProps } from './Item';
import ListView, { type ProListItemRender } from './ListView';
import type { ListProps } from './ProListBase';
import { useStyle } from './style/index';

export type AntdListProps<RecordType> = Omit<ListProps<RecordType>, 'rowKey'>;

export type ProListMeta<T> = Pick<
  ProColumnType<T>,
  | 'dataIndex'
  | 'valueType'
  | 'render'
  | 'search'
  | 'title'
  | 'valueEnum'
  | 'editable'
  | 'fieldProps'
  | 'formItemProps'
  | 'formItemRender'
> & {
  key?: React.Key;
};

type ProListMetaAction<T> = ProListMeta<T>;

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
type IsAny<T> = IfAny<T, true, false>;

export type BaseProListMetas<T = any> = {
  [key: string]: any;
  type?: ProListMeta<T>;
  title?: ProListMeta<T>;
  subTitle?: ProListMeta<T>;
  description?: ProListMeta<T>;
  avatar?: ProListMeta<T>;
  content?: ProListMeta<T>;
  actions?: ProListMetaAction<T>;
};

/**
 * @deprecated 推荐使用 columns + listSlot 的方式，与 ProTable 共用同一套 API
 */
export type ProListMetas<T = any> = BaseProListMetas<T> & {
  [key in keyof T]?: IsAny<T> extends true
    ? ProListMetaAction<T>
    : ProListMeta<T>;
};

export type GetComponentProps<RecordType> = (
  record: RecordType,
  index: number,
) => React.HTMLAttributes<HTMLElement>;

export type ProListProps<
  RecordType = any,
  Params = Record<string, any>,
  ValueType = 'text',
> = Omit<ProTableProps<RecordType, Params, ValueType>, 'size' | 'footer'> &
  AntdListProps<RecordType> & {
    tooltip?: LabelTooltipType | string;
    /**
     * @deprecated 推荐使用 columns + listSlot 的方式，与 ProTable 共用同一套 API
     *
     * @example 旧 API（metas）
     * metas={{ title: { dataIndex: 'name' }, avatar: { dataIndex: 'avatar' } }}
     *
     * @example 新 API（columns + listSlot）
     * columns={[
     *   { title: '名称', dataIndex: 'name', listSlot: 'title' },
     *   { dataIndex: 'avatar', listSlot: 'avatar' },
     * ]}
     */
    metas?: ProListMetas<RecordType>;
    onRow?: GetComponentProps<RecordType>;
    onItem?: GetComponentProps<RecordType>;
    itemCardProps?: CheckCardProps;
    rowClassName?: string | ((item: RecordType, index: number) => string);
    itemHeaderRender?: ItemProps<RecordType>['itemHeaderRender'];
    itemTitleRender?: ItemProps<RecordType>['itemTitleRender'];
    /** 自定义列表项渲染，defaultDom 为默认渲染的列表项元素 */
    itemRender?: ProListItemRender<RecordType>;
  };

export type Key = React.Key;

export type TriggerEventHandler<RecordType> = (record: RecordType) => void;

/** 根据 listSlot 推导默认的 valueType */
const DEFAULT_VALUE_TYPE_MAP: Record<string, ProFieldValueType> = {
  avatar: 'avatar',
  actions: 'option',
  description: 'textarea',
};

/**
 * 将 metas 对象转换为 columns 数组（向后兼容）
 */
function metasToColumns<RecordType>(
  metas: ProListMetas<RecordType>,
): ProColumnType<RecordType>[] {
  return Object.keys(metas).map((key) => {
    const meta = metas[key] || {};
    const valueType = meta.valueType || DEFAULT_VALUE_TYPE_MAP[key];
    return {
      listSlot: key,
      dataIndex: meta.dataIndex || key,
      ...meta,
      valueType,
    };
  });
}

/**
 * 为带有 listSlot 的 columns 填充默认 valueType
 */
function enrichColumnsWithDefaults<RecordType>(
  columns: ProColumns<RecordType>[],
): ProColumnType<RecordType>[] {
  return columns.map((col) => {
    const { listSlot } = col;
    if (!listSlot) return col;
    const valueType = col.valueType || DEFAULT_VALUE_TYPE_MAP[listSlot];
    return valueType ? { ...col, valueType } : col;
  });
}

function InternalProList<
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
>(props: ProListProps<RecordType, U>) {
  const {
    metas,
    columns: propsColumns,
    split,
    variant,
    footer,
    rowKey,
    tooltip,
    className,
    options = false,
    search = false,
    expandable,
    rowSelection: propRowSelection = false,
    pagination: propsPagination = false,
    itemLayout,
    itemRender,
    grid,
    itemCardProps,
    onRow,
    onItem,
    rowClassName,
    locale,
    itemHeaderRender,
    itemTitleRender,
    ...rest
  } = props;

  const actionRef = useRef<ActionType>();

  useImperativeHandle(rest.actionRef, () => actionRef.current);

  // metas 废弃提示，仅在开发环境触发一次
  useEffect(() => {
    warning(
      !metas,
      '[ProList] `metas` is deprecated. Please use `columns` with `listSlot` instead. ' +
        'See: columns={[ { dataIndex: "name", listSlot: "title" } ]}',
    );
  }, []);

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  /**
   * columns 优先级高于 metas
   * - 如果传入了 columns（且含有 listSlot），直接使用 columns
   * - 如果只传入了 metas，将 metas 转换为 columns（向后兼容）
   */
  const proTableColumns: ProColumnType<RecordType>[] = useMemo(() => {
    if (propsColumns && propsColumns.length > 0) {
      return enrichColumnsWithDefaults<RecordType>(propsColumns);
    }
    if (!metas) return [];
    return metasToColumns<RecordType>(metas);
  }, [propsColumns, metas]);

  const prefixCls = getPrefixCls('pro-list', props.prefixCls);

  const { wrapSSR, hashId } = useStyle(prefixCls);
  const listClassName = clsx(prefixCls, hashId, {
    [`${prefixCls}-no-split`]: !split,
    [`${prefixCls}-${variant}`]: variant,
  });

  return wrapSSR(
    <ProTable<RecordType, U>
      tooltip={tooltip}
      {...(rest as any)}
      actionRef={actionRef}
      pagination={propsPagination}
      type="list"
      rowSelection={propRowSelection}
      search={search}
      options={options}
      className={clsx(className, listClassName)}
      columns={proTableColumns}
      rowKey={rowKey}
      tableViewRender={({
        columns,
        size,
        pagination,
        rowSelection,
        dataSource,
        loading,
      }) => {
        return (
          <ListView
            grid={grid}
            itemCardProps={itemCardProps}
            itemTitleRender={itemTitleRender}
            prefixCls={props.prefixCls}
            columns={columns}
            itemRender={itemRender}
            actionRef={actionRef}
            dataSource={(dataSource || []) as RecordType[]}
            size={size as 'large'}
            footer={footer}
            split={split}
            variant={variant}
            rowKey={rowKey}
            expandable={expandable}
            rowSelection={propRowSelection === false ? undefined : rowSelection}
            pagination={pagination as PaginationProps}
            itemLayout={itemLayout}
            loading={loading}
            itemHeaderRender={itemHeaderRender}
            onRow={onRow}
            onItem={onItem}
            rowClassName={rowClassName}
            locale={locale}
            hashId={hashId}
          />
        );
      }}
    />,
  );
}

/** BaseProList 默认隐藏卡片、搜索和工具栏 */
function BaseProList<
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
>(props: ProListProps<RecordType, U>) {
  return (
    <ProConfigProvider needDeps>
      <InternalProList
        cardProps={false}
        search={false}
        toolBarRender={false}
        {...props}
      />
    </ProConfigProvider>
  );
}

function ProList<
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
>(props: ProListProps<RecordType, U>) {
  return (
    <ProConfigProvider needDeps>
      <InternalProList {...props} />
    </ProConfigProvider>
  );
}

export type { ProListItemRender } from './ListView';

export { BaseProList, ProList };

export default ProList;
