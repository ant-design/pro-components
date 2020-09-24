import React, { useMemo, useContext } from 'react';
import { ListProps } from 'antd/lib/list';
import { ProFieldValueType } from '@ant-design/pro-field';
import classNames from 'classnames';
import ProTable, { ProTableProps, ProColumns } from '@ant-design/pro-table';
import { ConfigContext as AntdConfigContext } from 'antd/lib/config-provider';
import ListView from './ListView';
import { PRO_LIST_KEYS } from './constans';

import './index.less';

type AntdListProps<RecordType> = Omit<ListProps<RecordType>, 'rowKey'>;

export interface ProListMeta<T = any> {
  dataIndex?: string | string[];
  valueType?: ProFieldValueType;
  render?: ProColumns['render'];
}

export interface ProListMetas {
  type?: ProListMeta;
  title?: ProListMeta;
  subTitle?: ProListMeta;
  description?: ProListMeta;
  avatar?: ProListMeta;
  extra?: ProListMeta;
  actions?: ProListMeta;
}

export interface ProListProps<RecordType, U extends { [key: string]: any }>
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
    >,
    AntdListProps<RecordType> {
  metas?: ProListMetas;
  showActions?: 'hover' | 'always';
}

export type Key = React.Key;

export type TriggerEventHandler<RecordType> = (record: RecordType) => void;

function ProList<RecordType = any, U = any>(props: ProListProps<RecordType, U>) {
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
    ...rest
  } = props;

  const { getPrefixCls } = useContext(AntdConfigContext);

  const proTableColumns: ProColumns[] = useMemo(() => {
    const ret: ProColumns[] = [];
    PRO_LIST_KEYS.forEach((key) => {
      if (!metas || !metas[key]) {
        return;
      }
      const meta = metas[key];
      let { valueType } = meta;
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

  return (
    <ProTable<RecordType>
      {...rest}
      search={search}
      options={options}
      className={classNames(getPrefixCls('pro-list'), className)}
      columns={proTableColumns}
      rowKey={rowKey}
      tableViewRender={({ columns, dataSource }) => (
        <ListView
          columns={columns}
          dataSource={dataSource}
          size={size}
          footer={footer}
          split={split}
          rowKey={rowKey}
          expandable={expandable}
          showActions={showActions}
        />
      )}
    />
  );
}

export default ProList;
