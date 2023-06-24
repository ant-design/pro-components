import type { ProCardProps } from '@ant-design/pro-card';
import { ProProvider } from '@ant-design/pro-provider';
import type { ActionType } from '@ant-design/pro-table';
import type {
  ListProps,
  TableColumnType,
  TablePaginationConfig,
  TableProps,
} from 'antd';
import { ConfigProvider, List, version } from 'antd';
import useLazyKVMap from 'antd/lib/table/hooks/useLazyKVMap';
import usePagination from 'antd/lib/table/hooks/usePagination';
import useSelection from 'antd/lib/table/hooks/useSelection';
import type { GetRowKey, TableRowSelection } from 'antd/lib/table/interface';
import classNames from 'classnames';
import get from 'rc-util/lib/utils/get';
import React, { useContext } from 'react';
import { PRO_LIST_KEYS_MAP } from './constants';
import type { GetComponentProps } from './index';
import type { ItemProps } from './Item';
import ProListItem from './Item';

import { compareVersions } from '@ant-design/pro-utils';
import type { PaginationConfig } from 'antd/lib/pagination';
import type { AnyObject } from 'antd/lib/table/Table';

type AntdListProps<RecordType> = Omit<ListProps<RecordType>, 'rowKey'>;
type Key = React.Key;
type TriggerEventHandler<RecordType> = (record: RecordType) => void;

export type ListViewProps<RecordType> = Omit<
  AntdListProps<RecordType>,
  'renderItem'
> &
  Pick<
    TableProps<RecordType>,
    'columns' | 'dataSource' | 'expandable' | 'pagination'
  > & {
    rowKey?: string | keyof RecordType | GetRowKey<RecordType>;
    showActions?: 'hover' | 'always';
    showExtra?: 'hover' | 'always';
    rowSelection?: TableRowSelection<RecordType>;
    prefixCls?: string;
    dataSource: readonly RecordType[];
    renderItem?: (
      item: RecordType,
      index: number,
      defaultDom: JSX.Element,
    ) => React.ReactNode;
    actionRef: React.MutableRefObject<ActionType | undefined>;
    // 当非卡片模式时，用于为每一行的项目绑定事件，用户设置 `grid`时将会失效
    onRow?: GetComponentProps<RecordType>;
    // 兼容普通和卡片模式的事件绑定，代表每一个项目的事件，是对`onRow`的补充
    onItem?: GetComponentProps<RecordType>;
    rowClassName?: string | ((item: RecordType, index: number) => string);
    /** Render 除了 header 之后的代码 */
    itemHeaderRender?: ItemProps<RecordType>['itemHeaderRender'];
    itemTitleRender?: ItemProps<RecordType>['itemTitleRender'];
    itemCardProps?: ProCardProps;
    pagination?: PaginationConfig;
  };

function ListView<RecordType extends AnyObject>(
  props: ListViewProps<RecordType>,
) {
  const {
    dataSource,
    columns,
    rowKey,
    showActions,
    showExtra,
    prefixCls: customizePrefixCls,
    actionRef,
    itemTitleRender,
    renderItem,
    itemCardProps,
    itemHeaderRender,
    expandable: expandableConfig,
    rowSelection,
    pagination, // List 的 pagination 默认是 false
    onRow,
    onItem,
    rowClassName,
    ...rest
  } = props;

  const { hashId } = useContext(ProProvider);

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const getRowKey = React.useMemo<
    GetRowKey<RecordType>
  >((): GetRowKey<RecordType> => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return (record: RecordType, index?: number) =>
      (record as any)[rowKey as string] || index;
  }, [rowKey]);

  const [getRecordByKey] = useLazyKVMap(dataSource, 'children', getRowKey);

  const usePaginationArgs = [() => {}, pagination] as [
    onChange: (current: number, pageSize: number) => void,
    pagination?: TablePaginationConfig | false,
  ];
  // 兼容 5.2.0 以下的版本
  if (compareVersions(version, '5.3.0') < 0) usePaginationArgs.reverse();
  // 合并分页的的配置，这里是为了兼容 antd 的分页
  const [mergedPagination] = usePagination(
    dataSource.length,
    usePaginationArgs[0],
    usePaginationArgs[1],
  );
  /** 根据分页来返回不同的数据，模拟 table */
  const pageData = React.useMemo<readonly RecordType[]>(() => {
    if (
      pagination === false ||
      !mergedPagination.pageSize ||
      dataSource.length < mergedPagination.total!
    ) {
      return dataSource;
    }

    const { current = 1, pageSize = 10 } = mergedPagination;
    const currentPageData = dataSource.slice(
      (current - 1) * pageSize,
      current * pageSize,
    );
    return currentPageData;
  }, [dataSource, mergedPagination, pagination]);
  const prefixCls = getPrefixCls('pro-list', customizePrefixCls);

  /** 提供和 table 一样的 rowSelection 配置 */
  const useSelectionArgs = [
    {
      getRowKey,
      getRecordByKey,
      prefixCls,
      data: dataSource as RecordType[],
      pageData: pageData as RecordType[],
      expandType: 'row',
      childrenColumnName: 'children',
      locale: {},
    },
    rowSelection,
    // 这个 API 用的不好，先 any 一下
  ] as [any, TableRowSelection<RecordType>];

  // 兼容 5.2.0 以下的版本
  if (compareVersions(version, '5.3.0') < 0) useSelectionArgs.reverse();
  const [selectItemRender, selectedKeySet] = useSelection(...useSelectionArgs);

  // 提供和 Table 一样的 expand 支持
  const {
    expandedRowKeys,
    defaultExpandedRowKeys,
    defaultExpandAllRows = true,
    onExpand,
    onExpandedRowsChange,
    rowExpandable,
  } = expandableConfig || {};

  /** 展开收起功能区域 star */
  const [innerExpandedKeys, setInnerExpandedKeys] = React.useState<Key[]>(
    () => {
      if (defaultExpandedRowKeys) {
        return defaultExpandedRowKeys as Key[];
      }
      if (defaultExpandAllRows !== false) {
        return dataSource.map(getRowKey);
      }
      return [];
    },
  );

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

  /** 展开收起功能区域 end */

  /** 这个是 选择框的 render 方法 为了兼容 antd 的 table,用了同样的渲染逻辑 所以看起来有点奇怪 */
  const selectItemDom = selectItemRender([])[0];
  return (
    <List<RecordType>
      {...rest}
      className={classNames(
        getPrefixCls('pro-list-container', customizePrefixCls),
        hashId,
        rest.className,
      )}
      dataSource={pageData as RecordType[]}
      pagination={
        pagination &&
        (mergedPagination as ListViewProps<RecordType>['pagination'])
      }
      renderItem={(item, index) => {
        const listItemProps: Partial<ItemProps<RecordType>> = {
          className:
            typeof rowClassName === 'function'
              ? rowClassName(item, index)
              : rowClassName,
        };

        (
          columns as (TableColumnType<RecordType> & {
            listKey: string;
            cardActionProps: string;
          })[]
        )?.forEach((column) => {
          const { listKey, cardActionProps } = column;
          if (!PRO_LIST_KEYS_MAP.has(listKey)) {
            return;
          }
          const dataIndex = (column.dataIndex ||
            listKey ||
            column.key) as string;
          const rawData = Array.isArray(dataIndex)
            ? get(item, dataIndex as string[])
            : item[dataIndex];

          /** 如果cardActionProps 需要直接使用源数组，因为 action 必须要源数组 */
          if (cardActionProps === 'actions' && listKey === 'actions') {
            listItemProps.cardActionProps = cardActionProps;
          }
          // 调用protable的列配置渲染数据
          const data = column.render
            ? column.render(rawData, item, index)
            : rawData;
          if (data !== '-') listItemProps[column.listKey] = data;
        });
        let checkboxDom;
        if (selectItemDom && selectItemDom.render) {
          checkboxDom = selectItemDom.render(item, item, index) || undefined;
        }
        const { isEditable, recordKey } =
          actionRef.current?.isEditable({ ...item, index }) || {};

        const isChecked = selectedKeySet.has(recordKey || index);

        const defaultDom = (
          <ProListItem
            key={recordKey}
            cardProps={
              rest.grid
                ? {
                    ...itemCardProps,
                    ...rest.grid,
                    checked: isChecked,
                    onChecked: React.isValidElement(checkboxDom)
                      ? (checkboxDom?.props as any)?.onChange
                      : undefined,
                  }
                : undefined
            }
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
            rowSupportExpand={
              !rowExpandable || (rowExpandable && rowExpandable(item))
            }
            selected={selectedKeySet.has(getRowKey(item, index))}
            checkbox={checkboxDom as React.ReactElement}
            onRow={onRow}
            onItem={onItem}
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
