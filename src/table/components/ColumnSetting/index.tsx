import {
  HolderOutlined,
  SettingOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  MouseSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Checkbox,
  ConfigProvider,
  Popover,
  Space,
  type TableColumnType,
  Tooltip,
  Typography,
} from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { clsx } from 'clsx';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { ProProvider, useIntl } from '../../../provider';
import { runFunction, useRefFunction } from '../../../utils';
import type { ColumnsState } from '../../Store/Provide';
import { TableContext } from '../../Store/Provide';
import type { ProColumns } from '../../typing';
import { genColumnKey } from '../../utils/index';
import type { SettingOptionType } from '../ToolBar';
import { useStyle } from './style';

type ColumnSettingProps<T = any> = SettingOptionType & {
  columns: TableColumnType<T>[];
};

interface FlattenColumnItem {
  key: string;
  columnKey: string;
  title: React.ReactNode;
  fixed?: boolean | 'left' | 'right';
  disabled?: boolean;
  disableCheckbox?: boolean;
  isLeaf: boolean;
  parentKey?: string;
  childKeys?: string[];
}

const ToolTipIcon: React.FC<{
  title: string;
  columnKey: string | number;
  show: boolean;
  fixed: 'left' | 'right' | undefined;
  children?: React.ReactNode;
}> = ({ title, show, children, columnKey, fixed }) => {
  const { columnsMap, setColumnsMap } = useContext(TableContext);
  if (!show) {
    return null;
  }
  return (
    <Tooltip title={title}>
      <span
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const config = columnsMap?.[columnKey] || {};
          const columnKeyMap = {
            ...columnsMap,
            [columnKey]: { ...config, fixed } as ColumnsState,
          };
          setColumnsMap(columnKeyMap);
        }}
      >
        {children}
      </span>
    </Tooltip>
  );
};

const CheckboxListItem: React.FC<{
  columnKey: string | number;
  className?: string;
  title?: React.ReactNode;
  fixed?: boolean | 'left' | 'right';
  showListItemOption?: boolean;
  isLeaf?: boolean;
}> = ({ columnKey, isLeaf, title, className, fixed, showListItemOption }) => {
  const intl = useIntl();
  const { hashId } = useContext(ProProvider);

  const dom = (
    <span className={clsx(`${className}-list-item-option`, hashId)}>
      <ToolTipIcon
        columnKey={columnKey}
        fixed="left"
        title={intl.getMessage('tableToolBar.leftPin', '固定在列首')}
        show={fixed !== 'left'}
      >
        <VerticalAlignTopOutlined />
      </ToolTipIcon>
      <ToolTipIcon
        columnKey={columnKey}
        fixed={undefined}
        title={intl.getMessage('tableToolBar.noPin', '不固定')}
        show={!!fixed}
      >
        <VerticalAlignMiddleOutlined />
      </ToolTipIcon>
      <ToolTipIcon
        columnKey={columnKey}
        fixed="right"
        title={intl.getMessage('tableToolBar.rightPin', '固定在列尾')}
        show={fixed !== 'right'}
      >
        <VerticalAlignBottomOutlined />
      </ToolTipIcon>
    </span>
  );
  return (
    <span className={clsx(`${className}-list-item`, hashId)} key={columnKey}>
      <div className={clsx(`${className}-list-item-title`, hashId)}>
        {title}
      </div>
      {showListItemOption && !isLeaf ? dom : null}
    </span>
  );
};

const SortableListItem: React.FC<{
  id: string;
  item: FlattenColumnItem;
  className: string;
  checkable: boolean;
  showListItemOption: boolean;
  checked: boolean;
  onCheck: (key: string, checked: boolean) => void;
}> = ({
  id,
  item,
  className,
  checkable,
  showListItemOption,
  checked,
  onCheck,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const normalizedTitle = runFunction(item.title, { ...item, key: item.columnKey });
  const wrappedTitle = (
    <Typography.Text
      style={{ width: 80 }}
      ellipsis={{ tooltip: normalizedTitle }}
    >
      {normalizedTitle}
    </Typography.Text>
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(`${className}-list-item-wrapper`, 'ant-tree-treenode')}
    >
      {checkable && (
        <span
          className={clsx('ant-tree-checkbox', {
            'ant-tree-checkbox-checked': checked,
            'ant-tree-checkbox-disabled': item.disableCheckbox,
          })}
          onClick={(e) => {
            e.stopPropagation();
            if (!item.disableCheckbox) onCheck(item.columnKey, !checked);
          }}
        >
          <Checkbox
            checked={checked}
            disabled={item.disableCheckbox}
            onChange={(e) => onCheck(item.columnKey, e.target.checked)}
            onClick={(e) => e.stopPropagation()}
          />
        </span>
      )}
      <div className="ant-tree-node-content-wrapper" {...attributes} {...listeners}>
        <CheckboxListItem
          className={className}
          columnKey={item.columnKey}
          title={wrappedTitle}
          fixed={item.fixed}
          showListItemOption={showListItemOption}
          isLeaf={item.isLeaf}
        />
        <span
          className={clsx(`${className}-list-item-drag-handle`)}
          onClick={(e) => e.stopPropagation()}
        >
          <HolderOutlined />
        </span>
      </div>
    </div>
  );
};

const CheckboxList: React.FC<{
  list: (ProColumns<any> & { index?: number })[];
  className?: string;
  title: string;
  draggable: boolean;
  checkable: boolean;
  showListItemOption: boolean;
  showTitle?: boolean;
  listHeight?: number;
}> = ({
  list,
  draggable,
  checkable,
  showListItemOption,
  className,
  showTitle = true,
  title: listTitle,
  listHeight = 280,
}) => {
  const { hashId } = useContext(ProProvider);

  const { columnsMap, setColumnsMap, sortKeyColumns, setSortKeyColumns } =
    useContext(TableContext);
  const show = list && list.length > 0;

  const { flatItems, itemMap } = useMemo(() => {
    if (!show) return { flatItems: [] as FlattenColumnItem[], itemMap: new Map<string, FlattenColumnItem>() };
    const flatItems: FlattenColumnItem[] = [];
    const itemMap = new Map<string, FlattenColumnItem>();

    const loopData = (
      data: any[],
      parentConfig?: ColumnsState & { columnKey: string },
    ): string[] => {
      const keys: string[] = [];
      data.forEach(({ key, dataIndex: _dataIndex, children, ...rest }, idx) => {
        const columnKey = genColumnKey(
          key,
          [parentConfig?.columnKey, rest.index ?? idx].filter(Boolean).join('-'),
        );
        const config = columnsMap?.[columnKey || 'null'] || { show: true };

        let childKeys: string[] | undefined;
        if (children?.length) {
          childKeys = loopData(children, { ...config, columnKey });
        }

        const item: FlattenColumnItem = {
          key: columnKey,
          columnKey,
          title: rest.title,
          fixed: config.fixed ?? rest.fixed,
          disabled: config.disable === true,
          disableCheckbox:
            typeof config.disable === 'boolean'
              ? config.disable
              : config.disable?.checkbox,
          isLeaf: !!parentConfig,
          parentKey: parentConfig?.columnKey,
          childKeys,
        };
        flatItems.push(item);
        itemMap.set(columnKey, item);
        keys.push(columnKey);
      });
      return keys;
    };
    loopData(list);
    return { flatItems, itemMap };
  }, [columnsMap, list, show]);

  const orderedItems = useMemo(() => {
    if (!flatItems.length) return [];
    const keysInGroup = new Set(flatItems.map((i) => i.columnKey));
    const ordered = sortKeyColumns.filter((k) => keysInGroup.has(k));
    const orderedSet = new Set(ordered);
    const unordered = flatItems.filter((i) => !orderedSet.has(i.columnKey));
    return [...ordered.map((k) => itemMap.get(k)!).filter(Boolean), ...unordered];
  }, [flatItems, itemMap, sortKeyColumns]);

  const checkedKeys = useMemo(() => {
    const keys: string[] = [];
    flatItems.forEach((item) => {
      const config = columnsMap?.[item.columnKey] || { show: true };
      if (!item.childKeys?.length) {
        if (config.show !== false) keys.push(item.columnKey);
      }
    });
    for (let i = flatItems.length - 1; i >= 0; i--) {
      const item = flatItems[i];
      if (item.childKeys?.length) {
        const allChildrenChecked = item.childKeys.every((ck) => keys.includes(ck));
        if (allChildrenChecked) keys.push(item.columnKey);
      }
    }
    return keys;
  }, [columnsMap, flatItems]);

  const move = useRefFunction(
    (id: React.Key, targetId: React.Key, dropPosition: number) => {
      const newMap = { ...columnsMap };
      const newColumns = [...sortKeyColumns];
      const findIndex = newColumns.findIndex((columnKey) => columnKey === id);
      const targetIndex = newColumns.findIndex(
        (columnKey) => columnKey === targetId,
      );
      const isDownWard = dropPosition >= findIndex;
      if (findIndex < 0) return;
      const targetItem = newColumns[findIndex];
      newColumns.splice(findIndex, 1);

      if (dropPosition === 0) {
        newColumns.unshift(targetItem);
      } else {
        newColumns.splice(
          isDownWard ? targetIndex : targetIndex + 1,
          0,
          targetItem,
        );
      }
      newColumns.forEach((key, order) => {
        newMap[key] = { ...(newMap[key] || {}), order };
      });
      setColumnsMap(newMap);
      setSortKeyColumns(newColumns);
    },
  );

  const onCheckItem = useRefFunction((key: string, checked: boolean) => {
    const newColumnMap = { ...columnsMap };
    const item = itemMap.get(key);
    if (!item) return;

    const loopSetShow = (k: string) => {
      const setting = { ...newColumnMap[k] };
      setting.show = checked;
      newColumnMap[k] = setting;
      itemMap.get(k)?.childKeys?.forEach(loopSetShow);
    };
    loopSetShow(key);

    const parentKey = item.parentKey;
    if (parentKey && checked) {
      newColumnMap[parentKey] = { ...newColumnMap[parentKey], show: true };
    }
    setColumnsMap(newColumnMap);
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragEnd = useRefFunction((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = orderedItems.findIndex((i) => i.columnKey === active.id);
    const newIndex = orderedItems.findIndex((i) => i.columnKey === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const dragKey = orderedItems[oldIndex].columnKey;
    const dropKey = orderedItems[newIndex].columnKey;
    move(dragKey, dropKey, newIndex);
  });

  if (!show) {
    return null;
  }

  const canDrag =
    draggable && orderedItems.length > 1;

  const listDom = canDrag ? (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderedItems.map((i) => i.columnKey as string)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className={clsx(`${className}-list-items`, hashId)}
          style={{ maxHeight: listHeight, overflow: 'auto' }}
        >
          {orderedItems.map((item) => (
            <SortableListItem
              key={item.columnKey}
              id={item.columnKey ?? ''}
              item={item}
              className={className ?? ''}
              checkable={checkable}
              showListItemOption={showListItemOption}
              checked={checkedKeys.includes(item.columnKey)}
              onCheck={onCheckItem}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  ) : (
    <div
      className={clsx(`${className}-list-items`, hashId)}
      style={{ maxHeight: listHeight, overflow: 'auto' }}
    >
      {orderedItems.map((item) => (
        <div
          key={item.columnKey}
          className={clsx(`${className}-list-item-wrapper`, 'ant-tree-treenode')}
        >
          <div className="ant-tree-node-content-wrapper">
            {checkable && (
              <span
                className={clsx('ant-tree-checkbox', {
                  'ant-tree-checkbox-checked': checkedKeys.includes(item.columnKey),
                  'ant-tree-checkbox-disabled': item.disableCheckbox,
                })}
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={checkedKeys.includes(item.columnKey)}
                  disabled={item.disableCheckbox}
                  onChange={(e) => onCheckItem(item.columnKey, e.target.checked)}
                  onClick={(e) => e.stopPropagation()}
                />
              </span>
            )}
            <CheckboxListItem
              className={className}
              columnKey={item.columnKey}
              title={
                <Typography.Text
                  style={{ width: 80 }}
                  ellipsis={{ tooltip: runFunction(item.title, { ...item, key: item.columnKey }) }}
                >
                  {runFunction(item.title, { ...item, key: item.columnKey })}
                </Typography.Text>
              }
              fixed={item.fixed}
              showListItemOption={showListItemOption}
              isLeaf={item.isLeaf}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {showTitle && (
        <span className={clsx(`${className}-list-title`, hashId)}>
          {listTitle}
        </span>
      )}
      {listDom}
    </>
  );
};

const GroupCheckboxList: React.FC<{
  localColumns: (ProColumns<any> & { index?: number })[];
  className?: string;
  draggable: boolean;
  checkable: boolean;
  showListItemOption: boolean;
  listsHeight?: number;
}> = ({
  localColumns,
  className,
  draggable,
  checkable,
  showListItemOption,
  listsHeight,
}) => {
  const { hashId } = useContext(ProProvider);
  const rightList: (ProColumns<any> & { index?: number })[] = [];
  const leftList: (ProColumns<any> & { index?: number })[] = [];
  const list: (ProColumns<any> & { index?: number })[] = [];
  const intl = useIntl();

  const { columnsMap } = useContext(TableContext);
  localColumns.forEach((item) => {
    if (item.hideInSetting) return;
    const columnKey = genColumnKey(item.key, item.index);
    const configFixed = columnsMap?.[columnKey]?.fixed;
    const fixed = configFixed ?? item.fixed;
    if (fixed === 'left') {
      leftList.push(item);
      return;
    }
    if (fixed === 'right') {
      rightList.push(item);
      return;
    }
    list.push(item);
  });

  const showRight = rightList && rightList.length > 0;
  const showLeft = leftList && leftList.length > 0;
  return (
    <div
      className={clsx(`${className}-list`, hashId, {
        [`${className}-list-group`]: showRight || showLeft,
      })}
    >
      <CheckboxList
        title={intl.getMessage('tableToolBar.leftFixedTitle', '固定在左侧')}
        list={leftList}
        draggable={draggable}
        checkable={checkable}
        showListItemOption={showListItemOption}
        className={className}
        listHeight={listsHeight}
      />
      <CheckboxList
        list={list}
        draggable={draggable}
        checkable={checkable}
        showListItemOption={showListItemOption}
        title={intl.getMessage('tableToolBar.noFixedTitle', '不固定')}
        showTitle={showLeft || showRight}
        className={className}
        listHeight={listsHeight}
      />
      <CheckboxList
        title={intl.getMessage('tableToolBar.rightFixedTitle', '固定在右侧')}
        list={rightList}
        draggable={draggable}
        checkable={checkable}
        showListItemOption={showListItemOption}
        className={className}
        listHeight={listsHeight}
      />
    </div>
  );
};

function ColumnSetting<T>(props: ColumnSettingProps<T>) {
  const columnRef = useRef(null);
  const counter = useContext(TableContext);
  const localColumns: TableColumnType<T> &
    {
      index?: number;
      fixed?: any;
      key?: any;
    }[] = props.columns;
  const { checkedReset = true } = props;
  const { columnsMap, setColumnsMap, clearPersistenceStorage } = counter;

  useEffect(() => {
    if (counter.propsRef.current?.columnsState?.value) {
      columnRef.current = JSON.parse(
        JSON.stringify(counter.propsRef.current?.columnsState?.value || {}),
      );
    }
  }, []);

  const setAllSelectAction = useRefFunction((show: boolean = true) => {
    const columnKeyMap = {} as Record<string, any>;
    const loopColumns = (columns: any) => {
      columns.forEach(({ key, fixed, index, children, disable }: any) => {
        const columnKey = genColumnKey(key, index);
        if (columnKey) {
          columnKeyMap[columnKey] = {
            show: disable ? columnsMap?.[columnKey]?.show : show,
            fixed,
            disable,
            order: columnsMap?.[columnKey]?.order,
          };
        }
        if (children) {
          loopColumns(children);
        }
      });
    };
    loopColumns(localColumns);
    setColumnsMap(columnKeyMap);
  });

  const checkedAll = useRefFunction((e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setAllSelectAction();
    } else {
      setAllSelectAction(false);
    }
  });

  const clearClick = useRefFunction(() => {
    clearPersistenceStorage?.();
    setColumnsMap(
      counter.propsRef.current?.columnsState?.defaultValue ||
        columnRef.current ||
        counter.defaultColumnKeyMap!,
    );
  });

  const unCheckedKeys = Object.values(columnsMap).filter(
    (value) => !value || value.show === false,
  );

  const indeterminate =
    unCheckedKeys.length > 0 && unCheckedKeys.length !== localColumns.length;

  const intl = useIntl();
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('pro-table-column-setting');
  const { wrapSSR, hashId } = useStyle(className);
  return wrapSSR(
    <Popover
      arrow={false}
      title={
        <div className={clsx(`${className}-title`, hashId)}>
          {props.checkable === false ? (
            <div />
          ) : (
            <Checkbox
              indeterminate={indeterminate}
              checked={
                unCheckedKeys.length === 0 &&
                unCheckedKeys.length !== localColumns.length
              }
              onChange={(e) => {
                checkedAll(e);
              }}
            >
              {intl.getMessage('tableToolBar.columnDisplay', '列展示')}
            </Checkbox>
          )}
          {checkedReset ? (
            <a
              onClick={clearClick}
              className={clsx(`${className}-action-rest-button`, hashId)}
            >
              {intl.getMessage('tableToolBar.reset', '重置')}
            </a>
          ) : null}
          {props?.extra ? (
            <Space size={12} align="center">
              {props.extra}
            </Space>
          ) : null}
        </div>
      }
      classNames={{
        root: clsx(`${className}-overlay`, hashId),
      }}
      trigger="click"
      placement="bottomRight"
      content={
        <GroupCheckboxList
          checkable={props.checkable ?? true}
          draggable={props.draggable ?? true}
          showListItemOption={props.showListItemOption ?? true}
          className={className}
          localColumns={localColumns}
          listsHeight={props.listsHeight}
        />
      }
    >
      {props.children || (
        <Tooltip
          title={intl.getMessage('tableToolBar.columnSetting', '列设置')}
        >
          {props.settingIcon ?? <SettingOutlined />}
        </Tooltip>
      )}
    </Popover>,
  );
}

export default ColumnSetting;
