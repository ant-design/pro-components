import React, { useMemo, useContext, useRef, useImperativeHandle } from 'react';
import type { ListProps, PaginationProps } from 'antd';
import classNames from 'classnames';
import type { ProTableProps, ProColumnType, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ParamsType } from '@ant-design/pro-provider';
import { ConfigProvider, Form } from 'antd';

import ListView from './ListView';

import './index.less';

type AntdListProps<RecordType> = Omit<ListProps<RecordType>, 'rowKey'>;

type ProListMeta<T> = Pick<
  ProColumnType<T>,
  'dataIndex' | 'valueType' | 'render' | 'search' | 'title' | 'valueEnum'
>;

export type ProListMetas<T> = {
  type?: ProListMeta<T>;
  title?: ProListMeta<T>;
  subTitle?: ProListMeta<T>;
  description?: ProListMeta<T>;
  avatar?: ProListMeta<T>;
  extra?: ProListMeta<T>;
  content?: ProListMeta<T>;
  actions?: ProListMeta<T>;
  [key: string]: ProListMeta<T> | undefined;
};

export type ProListProps<RecordType, U extends ParamsType> = Omit<
  ProTableProps<RecordType, U>,
  'size'
> &
  AntdListProps<RecordType> & {
    metas?: ProListMetas<RecordType>;
    showActions?: 'hover' | 'always';
  };

export type Key = React.Key;

export type TriggerEventHandler<RecordType> = (record: RecordType) => void;

function ProList<
  RecordType extends Record<string, any>,
  U extends Record<string, any> = Record<string, any>
>(props: ProListProps<RecordType, U>) {
  const {
    metas: metals,
    split,
    footer,
    rowKey,
    className,
    options = false,
    search = false,
    expandable,
    showActions,
    rowSelection: propRowSelection = false,
    pagination: propsPagination = false,
    itemLayout,
    renderItem,
    grid,
    ...rest
  } = props;

  const actionRef = useRef<ActionType>();

  useImperativeHandle(rest.actionRef, () => actionRef.current, [actionRef.current]);

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const proTableColumns: ProColumnType<RecordType>[] = useMemo(() => {
    const columns: ProColumnType<RecordType>[] = [];
    Object.keys(metals || {}).forEach((key) => {
      const meta = metals![key] || {};
      let { valueType } = meta;
      if (!valueType) {
        // 给默认的 valueType
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
        key,
        ...meta,
        valueType,
      });
    });
    return columns;
  }, [metals]);

  const prefixCls = getPrefixCls('pro-list');
  const listClassName = classNames(prefixCls, {
    [`${prefixCls}-no-split`]: !split,
  });

  return (
    <ProTable<RecordType, U>
      {...(rest as any)}
      actionRef={actionRef}
      pagination={propsPagination}
      search={search}
      options={options}
      className={classNames(prefixCls, className, listClassName)}
      columns={proTableColumns}
      rowKey={rowKey}
      cardProps={{
        bodyStyle: {
          padding: 0,
        },
      }}
      toolbar={{
        style: {
          padding: '0 24px',
        },
      }}
      tableViewRender={({ columns, size, pagination, rowSelection, dataSource, loading }) => {
        return (
          <Form component={false}>
            <ListView
              grid={grid}
              prefixCls={prefixCls}
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
              pagination={pagination as PaginationProps}
              itemLayout={itemLayout}
              loading={loading}
            />
          </Form>
        );
      }}
    />
  );
}

export default ProList;
