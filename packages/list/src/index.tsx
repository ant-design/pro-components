import React, { useMemo, useContext } from 'react';
import type { ListProps } from 'antd/lib/list';
import classNames from 'classnames';
import type { ProTableProps, ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ParamsType } from '@ant-design/pro-provider';
import { ConfigProvider } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
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

function ProList<RecordType, U extends Record<string, any> = {}>(
  props: ProListProps<RecordType, U>,
) {
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
    rowSelection,
    pagination: propsPagination = false,
    itemLayout,
    ...rest
  } = props;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const proTableColumns: ProColumnType<RecordType>[] = useMemo(() => {
    const columns: ProColumnType<RecordType>[] = [];
    Object.keys(metals || {}).forEach((key) => {
      if (!metals || !metals[key]) {
        return;
      }
      const meta = metals[key];
      let { valueType } = meta || {};
      if (!valueType) {
        // 给默认的 valueType
        if (key === 'avatar') {
          valueType = 'avatar';
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
      tableViewRender={({ columns, size, pagination, dataSource, loading }) => {
        return (
          <ListView
            prefixCls={prefixCls}
            columns={columns}
            dataSource={dataSource || []}
            size={size as 'large'}
            footer={footer}
            split={split}
            rowKey={rowKey}
            expandable={expandable}
            rowSelection={rowSelection === false ? undefined : rowSelection}
            showActions={showActions}
            pagination={pagination as PaginationConfig}
            itemLayout={itemLayout}
            loading={loading}
          />
        );
      }}
    />
  );
}

export default ProList;
