import React, { useMemo, useContext } from 'react';
import { List } from 'antd';
import { ListProps } from 'antd/lib/list';
import { ProFieldValueType } from '@ant-design/pro-field';
import classNames from 'classnames';
import ProTable, { ProTableProps, ProColumns } from '@ant-design/pro-table';
import { ColumnType } from 'antd/es/table';
import { ConfigContext as AntdConfigContext } from 'antd/lib/config-provider';
import get from 'rc-util/lib/utils/get';
import ProListItem from './Item';

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
  actions?: ProListMeta;
}

export interface ProListProps<RecordType, U extends { [key: string]: any }>
  extends Pick<
      ProTableProps<RecordType, U>,
      'dataSource' | 'loading' | 'toolBarRender' | 'rowKey' | 'headerTitle' | 'options' | 'search'
    >,
    AntdListProps<RecordType> {
  metas?: ProListMetas;
}

export type Key = React.Key;

export type TriggerEventHandler<RecordType> = (record: RecordType) => void;

const PRO_LIST_KEYS = ['title', 'subTitle', 'avatar', 'description', 'actions'];

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
    ...rest
  } = props;

  const { getPrefixCls } = useContext(AntdConfigContext);

  const columns: ProColumns[] = useMemo(() => {
    const ret: ProColumns[] = [];
    PRO_LIST_KEYS.forEach((key) => {
      if (!metas || !metas[key]) {
        return;
      }
      const meta = metas[key];
      let valueType = meta.valueType;
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
  const tableViewRender: ProTableProps<RecordType, any>['tableViewRender'] = ({
    dataSource,
    columns,
  }) => {
    return (
      <List<RecordType>
        size={size}
        footer={footer}
        split={split}
        dataSource={dataSource}
        renderItem={(item, index) => {
          const listItemProps = {};
          columns?.forEach((column: ColumnType<RecordType>) => {
            PRO_LIST_KEYS.forEach((key) => {
              if (column.key === key) {
                const dataIndex = column.dataIndex || key;
                const rawData = Array.isArray(dataIndex)
                  ? get(item, dataIndex as string[])
                  : item[dataIndex];
                listItemProps[key] = column.render ? column.render(rawData, item, index) : rawData;
              }
            });
          });
          return <ProListItem {...listItemProps} />;
        }}
      />
    );
  };

  return (
    <ProTable<RecordType>
      {...rest}
      search={search}
      options={options}
      className={classNames(getPrefixCls('pro-list'), className)}
      columns={columns}
      rowKey={rowKey}
      tableViewRender={tableViewRender}
    />
  );
}

export default ProList;
