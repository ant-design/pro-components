import type { ProCardProps } from '@ant-design/pro-card';
import type { ActionType, ProColumnType, ProTableProps } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ListProps, PaginationProps } from 'antd';
import { ConfigProvider } from 'antd';
import type { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import classNames from 'classnames';
import React, { useContext, useImperativeHandle, useMemo, useRef } from 'react';
import './index.less';
import type { ItemProps } from './Item';
import ListView from './ListView';

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
>;

export type ProListMetas<T = any> = {
  [key: string]: any;
  type?: ProListMeta<T>;
  title?: ProListMeta<T>;
  subTitle?: ProListMeta<T>;
  description?: ProListMeta<T>;
  avatar?: ProListMeta<T>;
  content?: ProListMeta<T>;
  actions?: ProListMeta<T> & {
    /**
     * @example
     *   `cardActionProps = 'actions';`;
     *
     * @name 选择映射到 card 上的 props，默认为extra
     */
    cardActionProps?: 'extra' | 'actions';
  };
};

export type GetComponentProps<RecordType> = (
  record: RecordType,
  index: number,
) => React.HTMLAttributes<HTMLElement>;

export type ProListProps<RecordType = any, Params = Record<string, any>, ValueType = 'text'> = Omit<
  ProTableProps<RecordType, Params, ValueType>,
  'size' | 'footer'
> &
  AntdListProps<RecordType> & {
    tooltip?: LabelTooltipType | string;
    metas?: ProListMetas<RecordType>;
    showActions?: 'hover' | 'always';
    showExtra?: 'hover' | 'always';
    onRow?: GetComponentProps<RecordType>;
    onItem?: GetComponentProps<RecordType>;
    itemCardProps?: ProCardProps;
    rowClassName?: string | ((item: RecordType, index: number) => string);
    itemHeaderRender?: ItemProps<RecordType>['itemHeaderRender'];
    itemTitleRender?: ItemProps<RecordType>['itemTitleRender'];
  };

export type Key = React.Key;

export type TriggerEventHandler<RecordType> = (record: RecordType) => void;

function ProList<
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
>(props: ProListProps<RecordType, U>) {
  const {
    metas: metals,
    split,
    footer,
    rowKey,
    tooltip,
    className,
    options = false,
    search = false,
    expandable,
    showActions,
    showExtra,
    rowSelection: propRowSelection = false,
    pagination: propsPagination = false,
    itemLayout,
    renderItem,
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

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const proTableColumns: ProColumnType<RecordType>[] = useMemo(() => {
    const columns: ProColumnType<RecordType>[] = [];
    Object.keys(metals || {}).forEach((key) => {
      const meta = metals![key] || {};
      let { valueType } = meta;
      if (!valueType) {
        // 根据 key 给不同的 valueType
        if (key === 'avatar') {
          valueType = 'avatar';
        }
        if (key === 'actions') {
          valueType = 'option';
        }
        if (key === 'description') {
          valueType = 'textarea';
        }
      }
      columns.push({
        listKey: key,
        dataIndex: meta?.dataIndex || key,
        ...meta,
        valueType,
      });
    });
    return columns;
  }, [metals]);

  const prefixCls = getPrefixCls('pro-list', props.prefixCls);
  const listClassName = classNames(prefixCls, {
    [`${prefixCls}-no-split`]: !split,
  });

  return (
    <ProTable<RecordType, U>
      tooltip={tooltip}
      {...(rest as any)}
      actionRef={actionRef}
      pagination={propsPagination}
      type="list"
      rowSelection={propRowSelection}
      search={search}
      options={options}
      className={classNames(prefixCls, className, listClassName)}
      columns={proTableColumns}
      rowKey={rowKey}
      tableViewRender={({ columns, size, pagination, rowSelection, dataSource, loading }) => {
        return (
          <ListView
            grid={grid}
            itemCardProps={itemCardProps}
            itemTitleRender={itemTitleRender}
            prefixCls={props.prefixCls}
            columns={columns}
            renderItem={renderItem}
            actionRef={actionRef}
            dataSource={(dataSource || []) as RecordType[]}
            size={size as 'large'}
            footer={footer}
            split={split}
            rowKey={rowKey}
            expandable={expandable}
            rowSelection={propRowSelection === false ? undefined : rowSelection}
            showActions={showActions}
            showExtra={showExtra}
            pagination={pagination as PaginationProps}
            itemLayout={itemLayout}
            loading={loading}
            itemHeaderRender={itemHeaderRender}
            onRow={onRow}
            onItem={onItem}
            rowClassName={rowClassName}
            locale={locale}
          />
        );
      }}
    />
  );
}

function BaseProList<
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
>(props: ProListProps<RecordType, U>) {
  return <ProList cardProps={false} search={false} toolBarRender={false} {...props} />;
}
export { BaseProList, ProList };

export default ProList;
