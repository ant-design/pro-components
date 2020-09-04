import React from 'react';
import { List } from 'antd';
import classNames from 'classnames';
import { noteOnce } from 'rc-util/lib/warning';
import { TableRowSelection, GetRowKey, ExpandableConfig } from 'antd/lib/table/interface';
import { ListProps } from 'antd/lib/list';
import ToolBar, { ToolBarProps } from './toolBar';
import useSelection from './hooks/useSelection';
import useLazyKVMap, { findAllChildrenKeys } from './hooks/useLazyKVMap';
import usePagination from './hooks/usePagination';
import getPrefixCls from './util/getPrefixCls';
import ProListItem, { ItemProps, ProListSubItem } from './Item';

import './index.less';

type AntdListProps<RecordType> = Omit<ListProps<RecordType>, 'rowKey'>;

type WithFalse<T> = T | false;

export interface HeaderViewProps {
  title?: React.ReactNode;
  actions?: React.ReactNode[];
}

export interface ProListProps<RecordType>
  extends Omit<ToolBarProps, 'locale'>,
    AntdListProps<RecordType> {
  rowSelection?: TableRowSelection<RecordType>;
  rowKey?: string | GetRowKey<RecordType>;
  renderItem: (row: RecordType, index: number) => ItemProps;
  listRenderItem?: (row: RecordType, index: number) => React.ReactNode;
  headerRender?: WithFalse<
    (props: HeaderViewProps, defaultDom: React.ReactNode) => React.ReactNode
  >;
  expandable?: ExpandableConfig<RecordType>;
  showActions?: 'hover' | 'always';
}

export type Key = React.Key;

export type TriggerEventHandler<RecordType> = (record: RecordType) => void;

function ProList<RecordType = any>(props: ProListProps<RecordType>) {
  const {
    rowSelection,
    prefixCls: customizePrefixCls,
    pagination,
    dataSource = [],
    rowKey,
    showActions = 'always',
    bordered,
    headerRender,
    split = true,
    expandable: expandableConfig,
    ...rest
  } = props;
  const prefixCls = getPrefixCls('list', customizePrefixCls);

  const getRowKey = React.useMemo<GetRowKey<RecordType>>((): GetRowKey<RecordType> => {
    if (typeof rowKey === 'function' && rowKey) {
      return rowKey;
    }

    return (record: RecordType, index?: number) => (record as any)[rowKey as string] || index;
  }, [rowKey]);

  const mergedData = dataSource.flatMap((item) => {
    // @ts-ignore
    if (item.children && Array.isArray(item.children)) {
      // @ts-ignore
      return [{ ...item }, ...item.children];
    }
    return item;
  });

  const [getRecordByKey] = useLazyKVMap(mergedData, 'children', getRowKey);

  // 合并分页的的配置
  const [mergedPagination] = usePagination(mergedData.length, pagination, () => {
    // console.log('run');
  });

  /**
   * 根据分页来回去不同的数据，模拟 table
   */
  const pageData = React.useMemo<RecordType[]>(() => {
    if (
      pagination === false ||
      !mergedPagination.pageSize ||
      mergedData.length < mergedPagination.total!
    ) {
      return mergedData;
    }

    const { current = 1, pageSize = 10 } = mergedPagination;
    const currentPageData = mergedData.slice((current - 1) * pageSize, current * pageSize);
    return currentPageData;
  }, [
    !!pagination,
    mergedData,
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

  const {
    expandedRowKeys,
    defaultExpandedRowKeys,
    defaultExpandAllRows = true,
    onExpand,
    onExpandedRowsChange,
  } = expandableConfig || {};

  const [innerExpandedKeys, setInnerExpandedKeys] = React.useState<Key[]>(() => {
    if (defaultExpandedRowKeys) {
      return defaultExpandedRowKeys;
    }
    if (defaultExpandAllRows !== false) {
      const keys = findAllChildrenKeys<RecordType>(mergedData, getRowKey, 'children');
      if (onExpandedRowsChange) {
        onExpandedRowsChange(keys);
      }
      return keys;
    }
    return [];
  });

  const mergedExpandedKeys = React.useMemo(
    () => new Set(expandedRowKeys || innerExpandedKeys || []),
    [expandedRowKeys, innerExpandedKeys],
  );

  const onTriggerExpand: TriggerEventHandler<RecordType> = React.useCallback(
    (record: RecordType) => {
      const key = getRowKey(record, mergedData.indexOf(record));
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
    [getRowKey, mergedExpandedKeys, mergedData, onExpand, onExpandedRowsChange],
  );

  /**
   * 这个是 选择框的 render 方法
   * 为了兼容 antd 的 table,用了同样的渲染逻辑
   * 所以看起来有点奇怪
   */
  const selectItemDom = selectItemRender();

  const defaultRenderItem = () => {
    const { rowExpandable } = expandableConfig || {};
    const { renderItem } = props;

    if (renderItem) {
      return (item: RecordType, index: number) => {
        const ProListItemProps = renderItem(item, index);
        // @ts-ignore
        if (item.children && Array.isArray(item.children)) {
          return (
            <ProListSubItem
              key={getRowKey(item, index)}
              prefixCls={prefixCls}
              {...ProListItemProps}
            />
          );
        }
        if (!ProListItemProps) {
          return undefined;
        }
        return (
          <ProListItem
            key={getRowKey(item, index)}
            prefixCls={prefixCls}
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
            item={item}
            {...ProListItemProps}
          />
        );
      };
    }
    if (props.listRenderItem) {
      return props.listRenderItem;
    }

    noteOnce(!!props.listRenderItem, 'list need renderItem');

    return (item: RecordType, index: number) => (
      <ProListItem
        prefixCls={prefixCls}
        expandable={expandableConfig}
        expand={mergedExpandedKeys.has(getRowKey(item, index))}
        onExpand={() => {
          onTriggerExpand(item);
        }}
        showActions={showActions}
        rowSupportExpand={!rowExpandable || (rowExpandable && rowExpandable(item))}
        selected={selectedKeySet.has(getRowKey(item, index))}
        checkbox={selectItemDom && selectItemDom.render && selectItemDom.render(item, item, index)}
        {...item}
      />
    );
  };
  const listClassName = classNames(prefixCls, {
    [`${prefixCls}-bordered`]: bordered,
    [`${prefixCls}-no-split`]: !split,
  });

  const renderHeader = () => {
    if (headerRender === false) {
      return null;
    }

    const defaultDom = (rest.title || rest.actions) && (
      <ToolBar className={`${prefixCls}-toolbar`} {...rest} />
    );

    if (headerRender) {
      return headerRender({ title: rest.title, actions: rest.actions }, defaultDom);
    }

    return defaultDom;
  };

  return (
    <div className={listClassName}>
      <List<RecordType>
        {...rest}
        split={false}
        header={renderHeader()}
        bordered={bordered}
        dataSource={pageData}
        renderItem={defaultRenderItem()}
        pagination={pagination && mergedPagination}
      />
    </div>
  );
}

export default ProList;
