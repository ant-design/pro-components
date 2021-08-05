import React, { useContext } from 'react';
import type { ListProps, TableColumnType, TableProps } from 'antd';
import { ConfigProvider, List } from 'antd';
import type { GetRowKey } from 'antd/lib/table/interface';
import type { ActionType } from '@ant-design/pro-table';
import type { GetComponentProps } from './index';
import get from 'rc-util/lib/utils/get';
import useLazyKVMap from 'antd/lib/table/hooks/useLazyKVMap';
import useSelection from 'antd/lib/table/hooks/useSelection';
import usePagination from 'antd/lib/table/hooks/usePagination';
import type { ItemProps } from './Item';
import ProListItem from './Item';
import { PRO_LIST_KEYS } from './constants';
import classNames from 'classnames';

type AntdListProps<RecordType> = Omit<ListProps<RecordType>, 'rowKey'>;
type Key = React.Key;
type TriggerEventHandler<RecordType> = (record: RecordType) => void;

export type ListViewProps<RecordType> = Omit<AntdListProps<RecordType>, 'renderItem'> &
  Pick<TableProps<RecordType>, 'columns' | 'dataSource' | 'expandable'> & {
    rowKey?: string | GetRowKey<RecordType>;
    showActions?: 'hover' | 'always';
    showExtra?: 'hover' | 'always';
    rowSelection?: TableProps<RecordType>['rowSelection'];
    prefixCls: string;
    dataSource: readonly RecordType[];
    renderItem?: (item: RecordType, index: number, defaultDom: JSX.Element) => React.ReactNode;
    actionRef: React.MutableRefObject<ActionType | undefined>;
    onRow?: GetComponentProps<RecordType>;
    /** Render 除了 header 之后的代码 */
    itemHeaderRender?: ItemProps<RecordType>['itemHeaderRender'];
    itemTitleRender?: ItemProps<RecordType>['itemTitleRender'];
  };

function ListView<RecordType>(props: ListViewProps<RecordType>) {
  const {
    dataSource,
    columns,
    rowKey,
    showActions,
    showExtra,
    prefixCls,
    actionRef,
    itemTitleRender,
    renderItem,
    itemHeaderRender,
    expandable: expandableConfig,
    rowSelection,
    pagination, // List 的 pagination 默认是 false
    onRow,
    ...rest
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const getRowKey = React.useMemo<GetRowKey<RecordType>>((): GetRowKey<RecordType> => {
    if (typeof rowKey === 'function' && rowKey) {
      return rowKey;
    }

    return (record: RecordType, index?: number) => (record as any)[rowKey as string] || index;
  }, [rowKey]);

  const [getRecordByKey] = useLazyKVMap(dataSource, 'children', getRowKey);

  // 合并分页的的配置
  const [mergedPagination] = usePagination(
    dataSource.length,
    { responsive: true, ...pagination } as any,
    () => {},
  );
  /** 根据分页来回去不同的数据，模拟 table */
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
  }, [dataSource, mergedPagination, pagination]);

  /** 提供和 table 一样的 rowSelection 配置 */
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
      return defaultExpandedRowKeys as Key[];
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

  /** 这个是 选择框的 render 方法 为了兼容 antd 的 table,用了同样的渲染逻辑 所以看起来有点奇怪 */
  const selectItemDom = selectItemRender([])[0];

  return (
    <List<RecordType>
      {...rest}
      className={classNames(getPrefixCls('pro-list-container'), rest.className)}
      dataSource={pageData}
      pagination={pagination && (mergedPagination as ListViewProps<RecordType>['pagination'])}
      renderItem={(item, index) => {
        const listItemProps = {};
        (columns as (TableColumnType<RecordType> & { listKey: string })[])?.forEach((column) => {
          PRO_LIST_KEYS.forEach((key) => {
            if (column.listKey === key) {
              const dataIndex = (column.dataIndex || key) as string;
              const rawData = Array.isArray(dataIndex)
                ? get(item, dataIndex as string[])
                : item[dataIndex];
              // 渲染数据
              const data = column.render ? column.render(rawData, item, index) : rawData;
              if (data !== '-') listItemProps[key] = data;
            }
          });
        });
        let checkboxDom;
        if (selectItemDom && selectItemDom.render) {
          checkboxDom = selectItemDom.render(item, item, index);
        }
        const { isEditable, recordKey } = actionRef.current?.isEditable({ ...item, index }) || {};
        const defaultDom = (
          <ProListItem
            key={recordKey}
            cardProps={rest.grid}
            {...listItemProps}
            recordKey={recordKey}
            isEditable={isEditable || false}
            expandable={expandableConfig}
            expand={mergedExpandedKeys.has(getRowKey(item, index))}
            onExpand={() => {
              onTriggerExpand(item);
            }}
            index={index}
            record={item}
            item={item}
            showActions={showActions}
            showExtra={showExtra}
            itemTitleRender={itemTitleRender}
            itemHeaderRender={itemHeaderRender}
            rowSupportExpand={!rowExpandable || (rowExpandable && rowExpandable(item))}
            selected={selectedKeySet.has(getRowKey(item, index))}
            checkbox={checkboxDom}
            onRow={onRow}
          />
        );

        if (renderItem) {
          return renderItem(item, index, defaultDom);
        }
        return defaultDom;
      }}
    />
  );
}

export default ListView;
