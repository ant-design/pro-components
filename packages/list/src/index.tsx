import React, { useMemo, useContext } from 'react';
import { ListProps } from 'antd/lib/list';
import classNames from 'classnames';
import ProTable, { ProTableProps, ProColumnType } from '@ant-design/pro-table';
import { ParamsType } from '@ant-design/pro-provider';
import { ConfigProvider } from 'antd';
import ListView from './ListView';

import './index.less';

type AntdListProps<RecordType> = Omit<ListProps<RecordType>, 'rowKey'>;

type ProListMeta<T> = Pick<
  ProColumnType<T>,
  'dataIndex' | 'valueType' | 'render' | 'search' | 'title' | 'valueEnum'
>;

export interface ProListMetas<T> {
  type?: ProListMeta<T>;
  title?: ProListMeta<T>;
  subTitle?: ProListMeta<T>;
  description?: ProListMeta<T>;
  avatar?: ProListMeta<T>;
  extra?: ProListMeta<T>;
  content?: ProListMeta<T>;
  actions?: ProListMeta<T>;
  [key: string]: ProListMeta<T> | undefined;
}

export interface ProListProps<RecordType, U extends ParamsType>
  extends Pick<
      ProTableProps<RecordType, U>,
      | 'dataSource'
      | 'loading'
      | 'toolBarRender'
      | 'rowKey'
      | 'headerTitle'
      | 'options'
      | 'search'
      | 'expandable'
      | 'rowSelection'
      | 'request'
    >,
    AntdListProps<RecordType> {
  metas?: ProListMetas<RecordType>;
  showActions?: 'hover' | 'always';
}

export type Key = React.Key;

export type TriggerEventHandler<RecordType> = (record: RecordType) => void;

function ProList<RecordType, U extends { [key: string]: any } = {}>(
  props: ProListProps<RecordType, U>,
) {
  const {
    metas: metals,
    split,
    pagination,
    size,
    footer,
    rowKey,
    className,
    options = false,
    search = false,
    expandable,
    showActions,
    rowSelection,
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
      {...rest}
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
      tableViewRender={({ columns, dataSource, loading }) => {
        return (
          <ListView
            prefixCls={prefixCls}
            columns={columns}
            dataSource={dataSource || []}
            size={size}
            footer={footer}
            split={split}
            rowKey={rowKey}
            expandable={expandable}
            rowSelection={rowSelection === false ? undefined : rowSelection}
            showActions={showActions}
            pagination={pagination}
            itemLayout={itemLayout}
            loading={loading}
          />
        );
      }}
    />
  );
}

export default ProList;
