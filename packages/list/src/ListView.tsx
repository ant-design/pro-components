import React from 'react';
import { List } from 'antd';
import { GetRowKey } from 'antd/lib/table/interface';
import { ListProps } from 'antd/lib/list';
import { ColumnType, TableProps } from 'antd/es/table';
import get from 'rc-util/lib/utils/get';
import useSelection from './hooks/useSelection';
import useLazyKVMap from './hooks/useLazyKVMap';
import usePagination from './hooks/usePagination';
import ProListItem from './Item';
import { PRO_LIST_KEYS } from './constans';

type AntdListProps<RecordType> = Omit<ListProps<RecordType>, 'rowKey'>;
type Key = React.Key;
type TriggerEventHandler<RecordType> = (record: RecordType) => void;

export interface ListViewProps<RecordType>
  extends AntdListProps<RecordType>,
    Pick<TableProps<RecordType>, 'columns' | 'dataSource' | 'expandable'> {
  rowKey?: string | GetRowKey<RecordType>;
  showActions?: 'hover' | 'always';
  rowSelection?: TableProps<RecordType>['rowSelection'];
  prefixCls: string;
}

function ListView<RecordType>(props: ListViewProps<RecordType>) {
  const {
    dataSource = [],
    columns,
    size,
    footer,
    split,
    bordered,
    rowKey,
    showActions,
    prefixCls,
    expandable: expandableConfig,
    rowSelection,
    pagination,
  } = props;

  const getRowKey = React.useMemo<GetRowKey<RecordType>>((): GetRowKey<RecordType> => {
    if (typeof rowKey === 'function' && rowKey) {
      return rowKey;
    }

    return (record: RecordType, index?: number) => (record as any)[rowKey as string] || index;
  }, [rowKey]);

  const [getRecordByKey] = useLazyKVMap(dataSource, 'children', getRowKey);

  // 合并分页的的配置
  const [mergedPagination] = usePagination(dataSource.length, pagination, () => {
    // console.log('run');
  });
  /**
   * 根据分页来回去不同的数据，模拟 table
   */
  const pageData = React.useMemo<RecordType[]>(() => {
    if (
      pagination === false ||
      !mergedPagination.pageSize ||
      dataSource.length < mergedPagination.total!
    ) {
      return dataSource;
    }

    const { current = 1, pageSize = 10 } = mergedPagination;
    const currentPageData = dataSource.slice((current - 1) * pageSize, current * pageSize);
    return currentPageData;
  }, [
    !!pagination,
    dataSource,
    mergedPagination && mergedPagination.current,
    mergedPagination && mergedPagination.pageSize,
    mergedPagination && mergedPagination.total,
  ]);

  /**
   * 提供和 table 一样的 rowSelection 配置
   */
  const [selectItemRender, selectedKeySet] = useSelection(rowSelection, {
    getRowKey,
    getRecordByKey,
    prefixCls,
    data: dataSource,
    pageData,
    expandType: 'row',
    childrenColumnName: 'children',
    locale: {},
    expandIconColumnIndex: 0,
  });

  // 提供和 Table 一样的 expand 支持
  const {
    expandedRowKeys,
    defaultExpandedRowKeys,
    defaultExpandAllRows = true,
    onExpand,
    onExpandedRowsChange,
    rowExpandable,
  } = expandableConfig || {};

  const [innerExpandedKeys, setInnerExpandedKeys] = React.useState<Key[]>(() => {
    if (defaultExpandedRowKeys) {
      return defaultExpandedRowKeys;
    }
    if (defaultExpandAllRows !== false) {
      return dataSource.map(getRowKey);
    }
    return [];
  });

  const mergedExpandedKeys = React.useMemo(
    () => new Set(expandedRowKeys || innerExpandedKeys || []),
    [expandedRowKeys, innerExpandedKeys],
  );

  const onTriggerExpand: TriggerEventHandler<RecordType> = React.useCallback(
    (record: RecordType) => {
      const key = getRowKey(record, dataSource.indexOf(record));
      let newExpandedKeys: Key[];
      const hasKey = mergedExpandedKeys.has(key);
      if (hasKey) {
        mergedExpandedKeys.delete(key);
        newExpandedKeys = [...mergedExpandedKeys];
      } else {
        newExpandedKeys = [...mergedExpandedKeys, key];
      }

      setInnerExpandedKeys(newExpandedKeys);
      if (onExpand) {
        onExpand(!hasKey, record);
      }
      if (onExpandedRowsChange) {
        onExpandedRowsChange(newExpandedKeys);
      }
    },
    [getRowKey, mergedExpandedKeys, dataSource, onExpand, onExpandedRowsChange],
  );

  /**
   * 这个是 选择框的 render 方法
   * 为了兼容 antd 的 table,用了同样的渲染逻辑
   * 所以看起来有点奇怪
   */
  const selectItemDom = selectItemRender();

  return (
    <List<RecordType>
      size={size}
      footer={footer}
      split={split}
      bordered={bordered}
      dataSource={dataSource}
      pagination={pagination && mergedPagination}
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
        return (
          <ProListItem
            {...listItemProps}
            expandable={expandableConfig}
            expand={mergedExpandedKeys.has(getRowKey(item, index))}
            onExpand={() => {
              onTriggerExpand(item);
            }}
            showActions={showActions}
            rowSupportExpand={!rowExpandable || (rowExpandable && rowExpandable(item))}
            selected={selectedKeySet.has(getRowKey(item, index))}
            checkbox={
              selectItemDom && selectItemDom.render && selectItemDom?.render(item, item, index)
            }
          />
        );
      }}
    />
  );
}

export default ListView;
