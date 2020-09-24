import React from 'react';
import { List } from 'antd';
import { GetRowKey } from 'antd/lib/table/interface';
import { ListProps } from 'antd/lib/list';
import { ColumnType, TableProps } from 'antd/es/table';
import get from 'rc-util/lib/utils/get';
import ProListItem from './Item';
import { PRO_LIST_KEYS } from './constans';

type AntdListProps<RecordType> = Omit<ListProps<RecordType>, 'rowKey'>;
type Key = React.Key;
type TriggerEventHandler<RecordType> = (record: RecordType) => void;

export interface ListViewProps<RecordType>
  extends AntdListProps<RecordType>,
    Pick<TableProps<RecordType>, 'columns' | 'dataSource' | 'expandable'> {
  rowKey?: string | GetRowKey<RecordType>;
}

function ListView<RecordType>(props: ListViewProps<RecordType>) {
  const {
    dataSource = [],
    columns,
    size,
    footer,
    split,
    rowKey,
    expandable: expandableConfig,
  } = props;

  const getRowKey = React.useMemo<GetRowKey<RecordType>>((): GetRowKey<RecordType> => {
    if (typeof rowKey === 'function' && rowKey) {
      return rowKey;
    }

    return (record: RecordType, index?: number) => (record as any)[rowKey as string] || index;
  }, [rowKey]);

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
        return (
          <ProListItem
            {...listItemProps}
            expandable={expandableConfig}
            expand={mergedExpandedKeys.has(getRowKey(item, index))}
            onExpand={() => {
              onTriggerExpand(item);
            }}
            rowSupportExpand={!rowExpandable || (rowExpandable && rowExpandable(item))}
          />
        );
      }}
    />
  );
}

export default ListView;
