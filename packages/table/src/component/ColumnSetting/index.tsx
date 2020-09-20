import React, { useContext, useEffect, useRef } from 'react';
import { useIntl } from '@ant-design/pro-provider';
import { ConfigContext } from 'antd/lib/config-provider';
import {
  SettingOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import { Checkbox, Popover, Tooltip } from 'antd';
import { DndProvider } from 'react-dnd';
import classNames from 'classnames';
import Backend from 'react-dnd-html5-backend';

import Container, { ColumnsState } from '../../container';
import { ProColumns } from '../../Table';
import DnDItem from './DndItem';
import './index.less';
import DragIcon from './DragIcon';
import { genColumnKey } from '../../utils';

interface ColumnSettingProps<T = any> {
  columns?: ProColumns<T>[];
}

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
        onClick={() => {
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
  columnsMap: {
    [key: string]: ColumnsState;
  };
  fixed?: boolean | 'left' | 'right';
  setColumnsMap: (map: { [key: string]: ColumnsState }) => void;
}> = ({ columnKey, className, columnsMap, title, setColumnsMap, fixed }) => {
  const intl = useIntl();
  const config = columnsMap[columnKey || 'null'] || { show: true };
  return (
    <span className={`${className}-list-item`} key={columnKey}>
      <DragIcon />
      <Checkbox
        onChange={(e) => {
          if (columnKey) {
            const tempConfig = columnsMap[columnKey] || {};
            const newSetting = { ...tempConfig };
            if (e.target.checked) {
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
          }
        }}
        checked={config.show !== false}
      >
        {title}
      </Checkbox>
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
    </span>
  );
};

const CheckboxList: React.FC<{
  list: (ProColumns<any> & { index?: number })[];
  className?: string;
  title: string;
  showTitle?: boolean;
}> = ({ list, className, showTitle = true, title: listTitle }) => {
  const { columnsMap, setColumnsMap, sortKeyColumns, setSortKeyColumns } = Container.useContainer();
  const show = list && list.length > 0;
  if (!show) {
    return null;
  }
  const move = (id: string, targetIndex: number) => {
    const newMap = { ...columnsMap };
    const newColumns = [...sortKeyColumns];
    const findIndex = newColumns.findIndex((columnKey) => columnKey === id);
    if (findIndex === undefined) {
      return;
    }
    const index = newColumns[findIndex];
    newColumns.splice(findIndex, 1);
    if (targetIndex === 0) {
      newColumns.unshift(index);
    } else {
      newColumns.splice(targetIndex, 0, index);
    }
    newColumns.forEach((key, order) => {
      newMap[key] = { ...(newMap[key] || {}), order };
    });
    setColumnsMap(newMap);
    setSortKeyColumns(newColumns);
  };

  const listDom = list.map(({ key, dataIndex, title, fixed, ...rest }, index) => {
    const columnKey = genColumnKey(key, rest.index);
    return (
      <DnDItem
        index={index}
        id={`${columnKey}`}
        key={columnKey}
        end={(id, targetIndex) => {
          move(id, targetIndex);
        }}
      >
        <CheckboxListItem
          setColumnsMap={setColumnsMap}
          columnKey={columnKey || `${index}`}
          columnsMap={columnsMap}
          title={title}
          fixed={fixed}
          className={className}
        />
      </DnDItem>
    );
  });
  return (
    <DndProvider backend={Backend}>
      {showTitle && <span className={`${className}-list-title`}>{listTitle}</span>}
      {listDom}
    </DndProvider>
  );
};

const GroupCheckboxList: React.FC<{
  localColumns: (ProColumns<any> & { index?: number })[];
  className?: string;
}> = ({ localColumns, className }) => {
  const rightList: (ProColumns<any> & { index?: number })[] = [];
  const leftList: (ProColumns<any> & { index?: number })[] = [];
  const list: (ProColumns<any> & { index?: number })[] = [];
  const intl = useIntl();

  localColumns.forEach((item) => {
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
        className={className}
      />
      {/* 如果没有任何固定，不需要显示title */}
      <CheckboxList
        list={list}
        title={intl.getMessage('tableToolBar.noFixedTitle', '不固定')}
        showTitle={showLeft || showRight}
        className={className}
      />
      <CheckboxList
        title={intl.getMessage('tableToolBar.rightFixedTitle', '固定在右侧')}
        list={rightList}
        className={className}
      />
    </div>
  );
};

const ColumnSetting = <T, U = {}>(props: ColumnSettingProps<T>) => {
  const columnRef = useRef({});
  const counter = Container.useContainer();
  const localColumns: Omit<ProColumns<any> & { index?: number }, 'ellipsis'>[] =
    props.columns || counter.columns || [];

  const { columnsMap, setColumnsMap, setSortKeyColumns } = counter;

  useEffect(() => {
    columnRef.current = JSON.parse(JSON.stringify(columnsMap));
  }, []);

  /**
   * 设置全部选中，或全部未选中
   * @param show
   */
  const setAllSelectAction = (show: boolean = true) => {
    const columnKeyMap = {};
    localColumns.forEach(({ key, fixed, index }) => {
      const columnKey = genColumnKey(key, index);
      if (columnKey) {
        columnKeyMap[columnKey] = {
          show,
          fixed,
        };
      }
    });
    setColumnsMap(columnKeyMap);
  };

  // 选中的 key 列表
  const selectedKeys = Object.values(columnsMap).filter((value) => !value || value.show === false);

  // 是否已经选中
  const indeterminate = selectedKeys.length > 0 && selectedKeys.length !== localColumns.length;

  const intl = useIntl();
  const { getPrefixCls } = useContext(ConfigContext);
  const className = getPrefixCls('pro-table-column-setting');
  const toolBarClassName = getPrefixCls('pro-table-toolbar');

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
          <a
            onClick={() => {
              setColumnsMap(columnRef.current);
              setSortKeyColumns([]);
            }}
          >
            {intl.getMessage('tableToolBar.reset', '重置')}
          </a>
        </div>
      }
      overlayClassName={`${className}-overlay`}
      trigger="click"
      placement="bottomRight"
      content={<GroupCheckboxList className={className} localColumns={localColumns} />}
    >
      <span className={`${toolBarClassName}-item-icon`}>
        <Tooltip title={intl.getMessage('tableToolBar.columnSetting', '列设置')}>
          <SettingOutlined />
        </Tooltip>
      </span>
    </Popover>
  );
};

export default ColumnSetting;
