import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { useIntl } from '@ant-design/pro-provider';
import {
  SettingOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import type { TableColumnType } from 'antd';
import { Checkbox, Tree, Popover, ConfigProvider, Tooltip, Space } from 'antd';
import classNames from 'classnames';
import type { DataNode } from 'antd/lib/tree';
import omit from 'omit.js';

import type { ColumnsState } from '../../container';
import Container from '../../container';
import { genColumnKey } from '../../utils/index';
import type { ProColumns } from '../../typing';

import './index.less';

type ColumnSettingProps<T = any> = {
  columns: TableColumnType<T>[];
  draggable?: boolean;
  checkable?: boolean;
  extra?: React.ReactNode;
  checkedReset?: boolean;
};

const ToolTipIcon: React.FC<{
  title: string;
  columnKey: string | number;
  show: boolean;
  fixed: 'left' | 'right' | undefined;
}> = ({ title, show, children, columnKey, fixed }) => {
  const { columnsMap, setColumnsMap } = Container.useContainer();
  if (!show) {
    return null;
  }
  return (
    <Tooltip title={title}>
      <span
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const config = columnsMap[columnKey] || {};
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
  isLeaf?: boolean;
}> = ({ columnKey, isLeaf, title, className, fixed }) => {
  const intl = useIntl();
  const dom = (
    <span className={`${className}-list-item-option`}>
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
    <span className={`${className}-list-item`} key={columnKey}>
      <div className={`${className}-list-item-title`}>{title}</div>
      {!isLeaf ? dom : null}
    </span>
  );
};

const CheckboxList: React.FC<{
  list: (ProColumns<any> & { index?: number })[];
  className?: string;
  title: string;
  draggable: boolean;
  checkable: boolean;
  showTitle?: boolean;
}> = ({ list, draggable, checkable, className, showTitle = true, title: listTitle }) => {
  const { columnsMap, setColumnsMap, sortKeyColumns, setSortKeyColumns } = Container.useContainer();
  const show = list && list.length > 0;
  const treeDataConfig = useMemo(() => {
    if (!show) return {};
    const checkedKeys: string[] = [];

    const loopData = (data: any[], parentConfig?: ColumnsState): DataNode[] =>
      data.map(({ key, dataIndex, children, ...rest }) => {
        const columnKey = genColumnKey(key, rest.index);
        const config = columnsMap[columnKey || 'null'] || { show: true };
        if (config.show !== false && parentConfig?.show !== false && !children) {
          checkedKeys.push(columnKey);
        }
        const item: DataNode = {
          key: columnKey,
          ...omit(rest, ['className']),
          selectable: false,
          isLeaf: parentConfig ? true : undefined,
        };
        if (children) {
          item.children = loopData(children, config);
        }
        return item;
      });
    return { list: loopData(list), keys: checkedKeys };
  }, [columnsMap, list, show]);

  if (!show) {
    return null;
  }

  const move = (id: React.Key, targetId: React.Key, dropPosition: number) => {
    const newMap = { ...columnsMap };
    const newColumns = [...sortKeyColumns];
    const findIndex = newColumns.findIndex((columnKey) => columnKey === id);
    const targetIndex = newColumns.findIndex((columnKey) => columnKey === targetId);
    const isDownWord = dropPosition > findIndex;
    if (findIndex < 0) {
      return;
    }
    const targetItem = newColumns[findIndex];
    newColumns.splice(findIndex, 1);
    if (dropPosition === 0) {
      newColumns.unshift(targetItem);
    } else {
      newColumns.splice(isDownWord ? targetIndex : targetIndex + 1, 0, targetItem);
    }
    // 重新生成排序数组
    newColumns.forEach((key, order) => {
      newMap[key] = { ...(newMap[key] || {}), order };
    });
    // 更新数组
    setColumnsMap(newMap);
    setSortKeyColumns(newColumns);
  };

  const listDom = (
    <Tree
      itemHeight={24}
      draggable={draggable}
      checkable={checkable}
      onDrop={(info) => {
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const { dropPosition, dropToGap } = info;
        const position = dropPosition === -1 || !dropToGap ? dropPosition + 1 : dropPosition;
        move(dragKey, dropKey, position);
      }}
      blockNode
      onCheck={(_, e) => {
        const columnKey = e.node.key;
        const tempConfig = columnsMap[columnKey] || {};
        const newSetting = { ...tempConfig };
        if (e.checked) {
          delete newSetting.show;
        } else {
          newSetting.show = false;
        }
        const columnKeyMap = {
          ...columnsMap,
          [columnKey]: newSetting as ColumnsState,
        };
        // 如果没有值了，直接干掉他
        if (Object.keys(newSetting).length === 0) {
          delete columnKeyMap[columnKey];
        }
        setColumnsMap(columnKeyMap);
      }}
      checkedKeys={treeDataConfig.keys}
      showLine={false}
      titleRender={(node) => {
        return (
          <CheckboxListItem
            className={className}
            {...node}
            children={undefined}
            columnKey={node.key}
          />
        );
      }}
      height={280}
      treeData={treeDataConfig.list}
    />
  );
  return (
    <>
      {showTitle && <span className={`${className}-list-title`}>{listTitle}</span>}
      {listDom}
    </>
  );
};

const GroupCheckboxList: React.FC<{
  localColumns: (ProColumns<any> & { index?: number })[];
  className?: string;
  draggable: boolean;
  checkable: boolean;
}> = ({ localColumns, className, draggable, checkable }) => {
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
      className={classNames(`${className}-list`, {
        [`${className}-list-group`]: showRight || showLeft,
      })}
    >
      <CheckboxList
        title={intl.getMessage('tableToolBar.leftFixedTitle', '固定在左侧')}
        list={leftList}
        draggable={draggable}
        checkable={checkable}
        className={className}
      />
      {/* 如果没有任何固定，不需要显示title */}
      <CheckboxList
        list={list}
        draggable={draggable}
        checkable={checkable}
        title={intl.getMessage('tableToolBar.noFixedTitle', '不固定')}
        showTitle={showLeft || showRight}
        className={className}
      />
      <CheckboxList
        title={intl.getMessage('tableToolBar.rightFixedTitle', '固定在右侧')}
        list={rightList}
        draggable={draggable}
        checkable={checkable}
        className={className}
      />
    </div>
  );
};

function ColumnSetting<T>(props: ColumnSettingProps<T>) {
  const columnRef = useRef({});
  const counter = Container.useContainer();
  const localColumns: TableColumnType<T> &
    {
      index?: number;
      fixed?: any;
      key?: any;
    }[] = props.columns;
  const { checkedReset = true } = props;
  const { columnsMap, setColumnsMap, clearPersistenceStorage } = counter;

  useEffect(() => {
    if (columnsMap) {
      columnRef.current = JSON.parse(JSON.stringify(columnsMap));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 设置全部选中，或全部未选中
   *
   * @param show
   */
  const setAllSelectAction = (show: boolean = true) => {
    const columnKeyMap = {};
    const loopColumns = (columns: any) => {
      columns.forEach(({ key, fixed, index, children }: any) => {
        const columnKey = genColumnKey(key, index);
        if (columnKey) {
          columnKeyMap[columnKey] = {
            show,
            fixed,
          };
        }
        if (children) {
          loopColumns(children);
        }
      });
    };
    loopColumns(localColumns);
    setColumnsMap(columnKeyMap);
  };

  // 选中的 key 列表
  const selectedKeys = Object.values(columnsMap).filter((value) => !value || value.show === false);

  // 是否已经选中
  const indeterminate = selectedKeys.length > 0 && selectedKeys.length !== localColumns.length;

  const intl = useIntl();
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('pro-table-column-setting');
  return (
    <Popover
      arrowPointAtCenter
      title={
        <div className={`${className}-title`}>
          <Checkbox
            indeterminate={indeterminate}
            checked={selectedKeys.length === 0 && selectedKeys.length !== localColumns.length}
            onChange={(e) => {
              if (e.target.checked) {
                setAllSelectAction();
              } else {
                setAllSelectAction(false);
              }
            }}
          >
            {intl.getMessage('tableToolBar.columnDisplay', '列展示')}
          </Checkbox>
          {checkedReset ? (
            <a
              onClick={() => {
                setColumnsMap(columnRef.current);
                clearPersistenceStorage?.();
              }}
              className={`${className}-ation-rest-button`}
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
      overlayClassName={`${className}-overlay`}
      trigger="click"
      placement="bottomRight"
      content={
        <GroupCheckboxList
          checkable={props.checkable ?? true}
          draggable={props.draggable ?? true}
          className={className}
          localColumns={localColumns}
        />
      }
    >
      <Tooltip title={intl.getMessage('tableToolBar.columnSetting', '列设置')}>
        <SettingOutlined />
      </Tooltip>
    </Popover>
  );
}

export default ColumnSetting;
