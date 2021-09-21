import React, { useMemo, useState, useCallback, useRef, useContext } from 'react';
import { useDragSort } from '../../utils/useDragSort';
import type { ParamsType } from '@ant-design/pro-provider';
import ProTable from '../../Table';
import { SortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import type { ProColumns, ProTableProps } from '../../typing';
import { useDeepCompareEffect } from '@ant-design/pro-utils';
import { ConfigProvider } from 'antd';
import './index.less';

export type DragTableProps<T, U extends ParamsType> = {
  /** @name 拖动排序列key值 如配置此参数，则会在该 key 对应的行显示拖拽排序把手，允许拖拽排序 */
  dragSortKey?: string;
  /** @name 渲染自定义拖动排序把手的函数 如配置了 dragSortKey 但未配置此参数，则使用默认把手图标 */
  dragSortHandlerRender?: (rowData: T, idx: number) => React.ReactNode;
  /** @name 拖动排序完成回调 */
  onDragSortEnd?: (newDataSource: T[]) => Promise<void> | void;
} & ProTableProps<T, U>;

// 用于创建可拖拽把手组件的工厂
const handleCreator = (handle: React.ReactNode) => SortableHandle(() => <>{handle}</>);

function DragSortTable<T, U extends ParamsType>(props: DragTableProps<T, U>) {
  const {
    rowKey,
    dragSortKey,
    dragSortHandlerRender,
    onDragSortEnd,
    onDataSourceChange,
    columns: propsColumns,
    dataSource: oriDs,
    ...otherProps
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  // 默认拖拽把手
  const DragHandle = useMemo(
    () => handleCreator(<MenuOutlined className={getPrefixCls('pro-table-drag-icon')} />),
    [getPrefixCls],
  );

  const [columns, setRefColumns] = useState<DragTableProps<T, U>['columns']>(propsColumns);

  const isDragSortColumn = useCallback(
    (item: ProColumns<T, any>) => {
      return item.key === dragSortKey || item.dataIndex === dragSortKey;
    },
    [dragSortKey],
  );
  // 根据 dragSortKey 查找目标列配置
  const handleColumn = useMemo(() => {
    return propsColumns?.find((item) => isDragSortColumn(item));
  }, [propsColumns, isDragSortColumn]);

  // 记录原始列配置
  const originColumnRef = useRef<ProColumns<T, 'text'> | undefined>({ ...handleColumn });
  // 使用自定义hooks获取拖拽相关组件的components集合
  const { components } = useDragSort<T>({
    data: oriDs?.slice(),
    dragSortKey,
    onDragSortEnd,
    components: props.components,
    rowKey,
  });

  // 重写列配置的render,并在卸载时恢复原始render
  useDeepCompareEffect(() => {
    const originColumn = originColumnRef.current!;
    if (!handleColumn) return () => {};
    const dargRender = (...args: any[]) => {
      const [dom, rowData, index, action, schema] = args;
      const RealHandle = dragSortHandlerRender
        ? handleCreator(dragSortHandlerRender(rowData, index))
        : DragHandle;
      return (
        <div className={getPrefixCls('pro-table-drag-visible-cell')}>
          <RealHandle />
          {originColumn.render?.(dom, rowData, index, action, schema)}
        </div>
      );
    };
    // 重新生成数据
    setRefColumns(
      columns?.map((item) => {
        if (!isDragSortColumn(item)) {
          return item;
        }
        return {
          ...item,
          render: dargRender,
        };
      }),
    );
    /* istanbul ignore next */
    return () => {
      setRefColumns(props.columns);
    };
  }, [dragSortHandlerRender, handleColumn]);

  return handleColumn ? (
    <ProTable
      {...otherProps}
      rowKey={rowKey}
      dataSource={oriDs}
      components={components}
      columns={columns}
      onDataSourceChange={onDataSourceChange}
    />
  ) : (
    /* istanbul ignore next */
    <ProTable
      {...otherProps}
      rowKey={rowKey}
      dataSource={oriDs}
      columns={columns}
      onDataSourceChange={onDataSourceChange}
    />
  );
}

export default DragSortTable;
