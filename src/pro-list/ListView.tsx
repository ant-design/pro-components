import { get } from '@rc-component/util';
import type { TableColumnType, TableProps } from 'antd';
import { ConfigProvider } from 'antd';
import type { AnyObject } from 'antd/lib/_util/type';
import type { PaginationConfig } from 'antd/lib/pagination';
import type { GetRowKey, TableRowSelection } from 'antd/lib/table/interface';
import { clsx } from 'clsx';
import React, { useContext } from 'react';
import type { CheckCardProps } from '../card';
import { ProProvider } from '../provider';
import type { ActionType } from '../table';
import useLazyKVMap from '../utils/useLazyKVMap';
import usePagination from '../utils/usePagination';
import useSelection from '../utils/useSelection';
import { PRO_LIST_KEYS_MAP } from './constants';
import type { GetComponentProps } from './index';
import type { ItemProps } from './Item';
import ProListItem from './Item';
import type { ListProps } from './ProListBase';
import { ProListContainer } from './ProListBase';

type AntdListProps<RecordType> = Omit<ListProps<RecordType>, 'rowKey'>;
type Key = React.Key;
type TriggerEventHandler<RecordType> = (record: RecordType) => void;

/** 自定义列表项渲染，defaultDom 为 ProList 默认渲染的列表项元素 */
export type ProListItemRender<RecordType> = (
  item: RecordType,
  index: number,
  defaultDom: React.ReactElement,
) => React.ReactNode;

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
    itemRender?: ProListItemRender<RecordType>;
    actionRef: React.MutableRefObject<ActionType | undefined>;
    // 当非卡片模式时，用于为每一行的项目绑定事件，用户设置 `grid`时将会失效
    onRow?: GetComponentProps<RecordType>;
    // 兼容普通和卡片模式的事件绑定，代表每一个项目的事件，是对`onRow`的补充
    onItem?: GetComponentProps<RecordType>;
    rowClassName?: string | ((item: RecordType, index: number) => string);
    /** Render 除了 header 之后的代码 */
    itemHeaderRender?: ItemProps<RecordType>['itemHeaderRender'];
    itemTitleRender?: ItemProps<RecordType>['itemTitleRender'];
    itemCardProps?: CheckCardProps;
    pagination?: PaginationConfig;
    hashId?: string;
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
    itemRender,
    itemCardProps,
    itemHeaderRender,
    expandable: expandableConfig,
    rowSelection,
    pagination, // List 的 pagination 默认是 false
    onRow,
    onItem,
    rowClassName,
    hashId: propHashId,
    ...rest
  } = props;

  const { hashId: contextHashId } = useContext(ProProvider);
  const hashId = propHashId ?? contextHashId;

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

  // 合并分页配置，兼容 antd 的分页
  const [mergedPagination] = usePagination(
    dataSource.length,
    () => {},
    pagination,
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
  const [selectItemRender, selectedKeySet] = useSelection(
    {
      getRowKey,
      getRecordByKey,
      prefixCls,
      data: dataSource as RecordType[],
      pageData: pageData as RecordType[],
      expandType: 'row',
      childrenColumnName: 'children',
      locale: {},
    } as any,
    rowSelection,
  );

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
    <ProListContainer<RecordType>
      {...rest}
      hashId={hashId}
      className={clsx(
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
            listSlot: string;
            cardActionProps: string;
          })[]
        )?.forEach((column) => {
          const { listSlot, cardActionProps } = column;
          if (!PRO_LIST_KEYS_MAP.has(listSlot)) {
            return;
          }
          const dataIndex = (column.dataIndex ||
            listSlot ||
            column.key) as string;
          const rawData = Array.isArray(dataIndex)
            ? get(item, dataIndex as string[])
            : item[dataIndex];

          /** 如果cardActionProps 需要直接使用源数组，因为 action 必须要源数组 */
          if (cardActionProps === 'actions' && listSlot === 'actions') {
            listItemProps.cardActionProps = cardActionProps;
          }
          // 调用protable的列配置渲染数据
          const data = column.render
            ? column.render(rawData, item, index)
            : rawData;
          // aside 是 extra 的新名称，映射到 Item 的 extra 属性
          const propKey = column.listSlot === 'aside' ? 'extra' : column.listSlot;
          if (data !== '-') (listItemProps as any)[propKey] = data;
        });
        const checkboxDom = selectItemDom?.render?.(
          item,
          item,
          index,
        ) as React.ReactNode;

        const { isEditable, recordKey } =
          actionRef.current?.isEditable({ ...item, index }) || {};

        const isChecked = selectedKeySet.has(recordKey || index);
        const itemKey = getRowKey(item, index);

        const cardProps = rest.grid
          ? {
              ...itemCardProps,
              ...rest.grid,
              checked: isChecked,
              onChange: React.isValidElement(checkboxDom)
                ? (changeChecked: boolean) =>
                    ((checkboxDom as JSX.Element)?.props as any)?.onChange({
                      nativeEvent: {},
                      target: { checked: changeChecked },
                      changeChecked,
                    })
                : undefined,
            }
          : undefined;

        const defaultDom = (
          <ProListItem
            key={recordKey}
            cardProps={cardProps}
            {...listItemProps}
            recordKey={recordKey}
            isEditable={isEditable || false}
            expandable={expandableConfig}
            expand={mergedExpandedKeys.has(itemKey)}
            onExpand={() => onTriggerExpand(item)}
            index={index}
            record={item}
            item={item}
            showActions={showActions}
            showExtra={showExtra}
            itemTitleRender={itemTitleRender}
            itemHeaderRender={itemHeaderRender}
            rowSupportExpand={!rowExpandable || rowExpandable(item)}
            selected={selectedKeySet.has(itemKey)}
            checkbox={checkboxDom as React.ReactElement}
            onRow={onRow}
            onItem={onItem}
          />
        );

        const renderedContent = itemRender
          ? itemRender(item, index, defaultDom)
          : defaultDom;

        if (!rest.grid?.gutter) return renderedContent;

        const gutter = rest.grid.gutter;
        const [horizontal, vertical] = Array.isArray(gutter)
          ? gutter
          : [gutter, gutter];
        const h = Number(horizontal) || 0;
        const v = Number(vertical) || 0;

        return (
          <div
            className={clsx(`${prefixCls}-grid-item`, hashId)}
            style={{
              paddingLeft: h / 2,
              paddingRight: h / 2,
              paddingTop: v / 2,
              paddingBottom: v / 2,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {renderedContent}
          </div>
        );
      }}
    />
  );
}

export default ListView;
