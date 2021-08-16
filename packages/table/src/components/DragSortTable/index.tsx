import React, { useEffect, useRef } from 'react';
import { useDragSort } from '../../utils/useDragSort';
import type { ParamsType } from '@ant-design/pro-provider';
import ProTable from '../../Table';
import { SortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import type { ProColumns, ProTableProps } from '../../typing';

export type DragTableProps<T, U extends ParamsType> = {
  /** @name 拖动排序列key值 如配置此参数，则会在该key对应的行显示拖拽排序把手，允许拖拽排序 */
  dragSortKey?: string;
  /** @name 渲染自定义拖动排序把手的函数 如配置了dragSortKey但未配置此参数，则使用默认把手图标 */
  dragSortHandlerRender?: (rowData: T, idx: number) => React.ReactNode;
  /** @name 拖动排序完成回调 */
  onDragSortEnd?: (newDataSource: T[]) => Promise<void> | void;
} & ProTableProps<T, U>;

// 用于创建可拖拽把手组件的工厂
const handleCreator = (handle: React.ReactNode) => SortableHandle(() => <>{handle}</>);
// 默认拖拽把手
const DragHandle = handleCreator(
  <MenuOutlined className="dragSortDefaultHandle" style={{ cursor: 'grab', color: '#999' }} />,
);

function DragSortTable<T, U extends ParamsType>(props: DragTableProps<T, U>) {
  const {
    dragSortKey,
    dragSortHandlerRender,
    onDragSortEnd,
    onDataSourceChange,
    columns,
    dataSource: oriDs,
    ...otherProps
  } = props;
  // 根据dragSortKey查找目标列配置
  const handleColumn = columns?.find(
    (item) => item.key === dragSortKey || item.dataIndex === dragSortKey,
  );
  // 记录原始列配置
  const originColumnRef = useRef<ProColumns<T, 'text'> | undefined>({ ...handleColumn });
  // 使用自定义hooks获取拖拽相关组件的components集合
  const { components } = useDragSort<T>({
    data: oriDs?.slice(),
    dragSortKey,
    onDragSortEnd,
    components: props.components,
  });

  // 重写列配置的render,并在卸载时恢复原始render
  useEffect(() => {
    const originColumn = originColumnRef.current!;
    if (handleColumn) {
      handleColumn.render = (...args: any[]) => {
        const [dom, rowData, index, action, schema] = args;
        const RealHandle = dragSortHandlerRender
          ? handleCreator(dragSortHandlerRender(rowData, index))
          : DragHandle;
        return (
          <>
            <RealHandle />
            {originColumn.render?.(dom, rowData, index, action, schema)}
          </>
        );
      };
    }
    /* istanbul ignore next */
    return () => {
      if (handleColumn) handleColumn.render = originColumn?.render;
    };
  }, [dragSortHandlerRender, handleColumn]);

  return handleColumn ? (
    <ProTable
      {...otherProps}
      dataSource={oriDs}
      components={components}
      columns={columns}
      onDataSourceChange={onDataSourceChange}
    />
  ) : (
    /* istanbul ignore next */
    <ProTable
      {...otherProps}
      dataSource={oriDs}
      columns={columns}
      onDataSourceChange={onDataSourceChange}
    />
  );
}

export default DragSortTable;
