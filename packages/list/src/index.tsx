import React, { useMemo, useContext } from 'react';
import { ListProps } from 'antd/lib/list';
import classNames from 'classnames';
import ProTable, { ProTableProps, ProColumns } from '@ant-design/pro-table';
import { ParamsType } from '@ant-design/pro-provider';
import { ConfigContext as AntdConfigContext } from 'antd/lib/config-provider';
import ListView from './ListView';

import './index.less';

type AntdListProps<RecordType> = Omit<ListProps<RecordType>, 'rowKey'>;

type ProListMeta = Pick<
  ProColumns,
  'dataIndex' | 'valueType' | 'render' | 'hideInSearch' | 'title' | 'valueEnum'
>;

export interface ProListMetas {
  type?: ProListMeta;
  title?: ProListMeta;
  subTitle?: ProListMeta;
  description?: ProListMeta;
  avatar?: ProListMeta;
  extra?: ProListMeta;
  content?: ProListMeta;
  actions?: ProListMeta;
  [key: string]: ProListMeta | undefined;
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
  metas?: ProListMetas;
  showActions?: 'hover' | 'always';
}

export type Key = React.Key;

export type TriggerEventHandler<RecordType> = (record: RecordType) => void;

function ProList<RecordType, U extends { [key: string]: any } = {}>(
  props: ProListProps<RecordType, U>,
) {
  const {
    metas,
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
    bordered,
    rowSelection,
    itemLayout,
    ...rest
  } = props;

  const { getPrefixCls } = useContext(AntdConfigContext);

  const proTableColumns: ProColumns[] = useMemo(() => {
    const ret: ProColumns[] = [];
    Object.keys(metas || {}).forEach((key) => {
      if (!metas || !metas[key]) {
        return;
      }
      const meta = metas[key];
      let { valueType } = meta || {};
      if (!valueType) {
        // 给默认的 valueType
        if (key === 'avatar') {
          valueType = 'avatar';
        }
      }
      ret.push({
        key,
        ...meta,
        valueType,
      });
    });
    return ret;
  }, [metas]);
  const prefixCls = getPrefixCls('pro-list');
  const listClassName = classNames(prefixCls, {
    [`${prefixCls}-bordered`]: bordered,
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
      tableViewRender={({ columns, dataSource, loading }) => (
        <ListView
          prefixCls={prefixCls}
          columns={columns}
          dataSource={dataSource}
          size={size}
          footer={footer}
          split={split}
          bordered={bordered}
          rowKey={rowKey}
          expandable={expandable}
          rowSelection={rowSelection === false ? undefined : rowSelection}
          showActions={showActions}
          pagination={pagination}
          itemLayout={itemLayout}
          loading={loading}
        />
      )}
    />
  );
}

export default ProList;
