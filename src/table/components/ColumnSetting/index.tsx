import {
  SettingOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { omit } from '@rc-component/util';
import {
  Checkbox,
  ConfigProvider,
  Popover,
  Space,
  type TableColumnType,
  Tooltip,
  Tree,
  Typography,
} from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import type { DataNode } from 'antd/lib/tree';
import { clsx } from 'clsx';
import React, { useContext, useMemo } from 'react';
import { ProProvider, useIntl } from '../../../provider';
import { runFunction, useRefFunction } from '../../../utils';
import type { ColumnsState } from '../../Store/Provide';
import { TableContext } from '../../Store/Provide';
import type { ProColumns } from '../../typing';
import { genColumnKey } from '../../utils/index';
import type { SettingOptionType } from '../ToolBar';
import { useStyle } from './style';

type ColumnSettingProps<T = any> = SettingOptionType & {
  // `columns` 类型与 ToolBar 保持一致（TableColumnType<T> & { index? }），
  // 使用与 ToolBar 一致的类型，以便消费 index 等字段，
  // 同时与 GroupCheckboxList / CheckboxList 的内部 any cast 保持兼容。
  columns: (TableColumnType<T> & { index?: number })[];
};

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
  const treeDataConfig = useMemo(() => {
    if (!show) return {};
    const checkedKeys: string[] = [];
    const treeMap = new Map<
      string | number,
      DataNode & { parentKey?: string }
    >();

    const loopData = (
      data: any[],
      parentConfig?: ColumnsState & {
        columnKey: string;
      },
    ): DataNode[] =>
      data.map(({ key, dataIndex: _dataIndex, children, ...rest }) => {
        const columnKey = genColumnKey(
          key,
          [parentConfig?.columnKey, rest.index].filter(Boolean).join('-'),
        );
        const config = columnsMap?.[columnKey || 'null'] || { show: true };
        if (config.show !== false && !children) {
          checkedKeys.push(columnKey);
        }

        const item: DataNode = {
          key: columnKey,
          ...omit(rest, ['className']),
          selectable: false,
          disabled: config.disable === true,
          disableCheckbox:
            typeof config.disable === 'boolean'
              ? config.disable
              : config.disable?.checkbox,
          isLeaf: parentConfig ? true : undefined,
        };

        if (children) {
          item.children = loopData(children, {
            ...config,
            columnKey,
          });
          // 如果children 已经全部是show了，把自己也设置为show
          if (
            item.children?.every((childrenItem) =>
              checkedKeys?.includes(childrenItem.key as string),
            )
          ) {
            checkedKeys.push(columnKey);
          }
        }
        // 必须用 columnKey（Tree 节点的 key）而非原始 column.key 存入 treeMap，
        // 否则 onCheckTree.loopSetShow 通过 e.node.key（= columnKey）查父子关系时
        // treeMap.get 永远返回 undefined，导致嵌套列的父子联动全部失效。
        treeMap.set(columnKey, { ...item, parentKey: parentConfig?.columnKey });
        return item;
      });
    return { list: loopData(list), keys: checkedKeys, map: treeMap };
  }, [columnsMap, list, show]);

  /** 移动到指定的位置 */
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
      // 重新生成排序数组
      newColumns.forEach((key, order) => {
        newMap[key] = { ...(newMap[key] || {}), order };
      });
      // 更新数组
      setColumnsMap(newMap);
      setSortKeyColumns(newColumns);
    },
  );

  /** 选中反选功能 */
  const onCheckTree = useRefFunction((e) => {
    const newColumnMap = { ...columnsMap };

    const loopSetShow = (key: string | number) => {
      const newSetting = { ...newColumnMap[key] };
      newSetting.show = e.checked;

      // 如果含有子节点，也要同步子节点状态
      if (treeDataConfig.map?.get(key)?.children) {
        treeDataConfig.map
          .get(key)
          ?.children?.forEach((item) => loopSetShow(item.key as string));
      }

      // 先写入当前节点，再检查父节点 —— 顺序至关重要：
      // 父节点逻辑需要读取兄弟节点的最新状态，当前节点必须先写入 newColumnMap，
      // 否则读到的仍是旧值，导致 allSiblingsUnchecked 判断出错。
      newColumnMap[key] = newSetting;

      // 勾选方向：子节点选中时父节点自动设为 true
      // 取消方向：检查所有兄弟节点是否已全部取消，若是则父节点也取消
      const parentKey = treeDataConfig.map?.get(key)?.parentKey;
      if (parentKey) {
        if (e.checked) {
          newColumnMap[parentKey] = { ...newColumnMap[parentKey], show: true };
        } else {
          const siblings = treeDataConfig.map?.get(parentKey)?.children ?? [];
          const allSiblingsUnchecked = siblings.every((sibling) => {
            const siblingState = newColumnMap[sibling.key as string];
            return siblingState && siblingState.show === false;
          });
          if (allSiblingsUnchecked) {
            newColumnMap[parentKey] = {
              ...newColumnMap[parentKey],
              show: false,
            };
          }
        }
      }
    };
    loopSetShow(e.node.key);
    setColumnsMap({ ...newColumnMap });
  });

  if (!show) {
    return null;
  }

  const listDom = (
    <Tree
      itemHeight={24}
      draggable={
        draggable &&
        !!treeDataConfig.list?.length &&
        treeDataConfig.list?.length > 1
      }
      checkable={checkable}
      onDrop={(info) => {
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const { dropPosition, dropToGap } = info;
        const position =
          dropPosition === -1 || !dropToGap ? dropPosition + 1 : dropPosition;
        move(dragKey, dropKey, position);
      }}
      blockNode
      onCheck={(_, e) => onCheckTree(e)}
      checkedKeys={treeDataConfig.keys}
      showLine={false}
      titleRender={(_node) => {
        const node = { ..._node, children: undefined };
        if (!node.title) return null;
        const normalizedTitle = runFunction(node.title, node);
        const wrappedTitle = (
          <Typography.Text
            style={{ width: 80 }}
            ellipsis={{ tooltip: normalizedTitle }}
          >
            {normalizedTitle}
          </Typography.Text>
        );

        return (
          <CheckboxListItem
            className={className}
            {...omit(node, ['key'])}
            showListItemOption={showListItemOption}
            title={wrappedTitle}
            columnKey={node.key as string}
          />
        );
      }}
      height={listHeight}
      treeData={treeDataConfig.list?.map(
        ({
          disabled:
            _disabled /* 不透传 disabled，使子节点禁用时也可以拖动调整顺序 */,
          ...config
        }) => config,
      )}
    />
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

  localColumns.forEach((item) => {
    /** 不在 setting 中展示的 */
    if (item.hideInSetting) {
      return;
    }
    const { fixed } = item;
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
      {/* 如果没有任何固定，不需要显示title */}
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
  // 获得当前上下文的 hashID
  const counter = useContext(TableContext);
  // 注意：括号必不可少。`&` 优先级低于数组类型后缀 `[]`，
  // 若写成 `T & { ... }[]` 实际是「单个对象 & 数组」的交叉类型，
  // 导致泛型 T 字段信息完全坍塌为 any[]（本轮修复的核心问题）。
  const localColumns: (TableColumnType<T> & {
    index?: number;
    fixed?: any;
    key?: any;
  })[] = props.columns;
  const { checkedReset = true } = props;
  const { columnsMap, setColumnsMap, clearPersistenceStorage } = counter;

  /**
   * 设置全部选中，或全部未选中
   *
   * @param show
   */
  const setAllSelectAction = useRefFunction((show: boolean = true) => {
    const columnKeyMap = {} as Record<string, any>;
    const loopColumns = (columns: any) => {
      columns.forEach(({ key, fixed, index, children, disable }: any) => {
        const columnKey = genColumnKey(key, index);
        if (columnKey) {
          columnKeyMap[columnKey] = {
            // 子节点 disable 时，不修改节点显示状态
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

  /** 全选和反选 */
  const checkedAll = useRefFunction((e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setAllSelectAction();
    } else {
      setAllSelectAction(false);
    }
  });

  /** 重置项目 */
  const clearClick = useRefFunction(() => {
    clearPersistenceStorage?.();
    // 直接从 propsRef 读取最新 columnsState.value，消除 mount-only 缓存的 stale 问题：
    // 若父组件后续更新 columnsState.value，columnsState.defaultValue 优先，
    // 然后是 columnsState.value 的当前值，最后 fallback 到 defaultColumnKeyMap。
    setColumnsMap(
      counter.propsRef.current?.columnsState?.defaultValue ||
        counter.propsRef.current?.columnsState?.value ||
        counter.defaultColumnKeyMap!,
    );
  });

  // 未选中的 key 列表 —— 从 localColumns（当前可见列）派生，而非从 columnsMap 全量
  // 派生。columnsMap 可能含有 hideInSetting 列或运行时被删掉的「过期 key」，导致分子
  // 与分母（localColumns.length）不对齐，indeterminate 计算出现偏差。
  const unCheckedKeys = useMemo(() => {
    return localColumns.filter(({ key, dataIndex }, index) => {
      const columnKey = genColumnKey(key ?? (dataIndex as React.Key), index);
      const state = columnsMap?.[columnKey];
      return state && state.show === false;
    });
  }, [columnsMap, localColumns]);

  // 是否全部列都已选中
  const allChecked = unCheckedKeys.length === 0 && localColumns.length > 0;

  // 是否部分选中（indeterminate）
  const indeterminate =
    unCheckedKeys.length > 0 && unCheckedKeys.length < localColumns.length;

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
              checked={allChecked}
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
          localColumns={localColumns as any}
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
